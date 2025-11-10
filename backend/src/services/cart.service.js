import Cart from '../models/cart.model.js';
import ApiError from '../utils/ApiError.js';
import { getProductById } from './product.service.js';

function buildCartFilter({ userId, sessionId }) {
  if (userId) {
    return { userId, status: 'ACTIVE' };
  }

  if (sessionId) {
    return { sessionId, status: 'ACTIVE' };
  }

  throw new ApiError(400, 'Missing cart context (userId or sessionId)');
}

async function getOrCreateActiveCart(context) {
  const filter = buildCartFilter(context);

  let cart = await Cart.findOne(filter).populate('items.productId');

  if (!cart) {
    cart = new Cart({
      ...filter,
      items: []
    });

    await cart.save();
  }

  return cart;
}

export async function fetchCart(context) {
  const filter = buildCartFilter(context);

  const cart = await Cart.findOne(filter).populate('items.productId');

  if (!cart) {
    return {
      items: [],
      status: 'ACTIVE',
      totals: { quantity: 0, amount: 0 }
    };
  }

  return normalizeCart(cart);
}

export async function addItemToCart(context, { productId, quantity }) {
  const numericQuantity = Number(quantity) || 1;

  if (numericQuantity < 1) {
    throw new ApiError(400, 'Quantity must be at least 1');
  }

  const product = await getProductById(productId);

  if (product.stock < numericQuantity) {
    throw new ApiError(400, 'Insufficient stock');
  }

  const cart = await getOrCreateActiveCart(context);

  const existingItem = cart.items.find((item) => item.productId.equals(product._id));

  if (existingItem) {
    existingItem.quantity += numericQuantity;
    existingItem.priceSnapshot = product.price;
  } else {
    cart.items.push({
      productId: product._id,
      quantity: numericQuantity,
      priceSnapshot: product.price
    });
  }

  await cart.save();
  await cart.populate('items.productId');

  return normalizeCart(cart);
}

export async function removeItemFromCart(context, { itemId }) {
  const cart = await getOrCreateActiveCart(context);

  const itemIndex = cart.items.findIndex((item) => item._id.toString() === itemId);

  if (itemIndex === -1) {
    throw new ApiError(404, 'Cart item not found');
  }

  cart.items.splice(itemIndex, 1);
  await cart.save();
  await cart.populate('items.productId');

  return normalizeCart(cart);
}

function normalizeCart(cart) {
  const items = cart.items.map((item) => ({
    id: item._id.toString(),
    product: item.productId,
    quantity: item.quantity,
    priceSnapshot: item.priceSnapshot,
    lineTotal: item.quantity * item.priceSnapshot
  }));

  const totals = items.reduce(
    (acc, item) => {
      acc.quantity += item.quantity;
      acc.amount += item.lineTotal;
      return acc;
    },
    { quantity: 0, amount: 0 }
  );

  return {
    id: cart._id.toString(),
    status: cart.status,
    items,
    totals
  };
}

