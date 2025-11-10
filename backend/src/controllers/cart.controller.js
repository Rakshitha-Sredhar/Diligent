import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import { addItemToCart, fetchCart, removeItemFromCart } from '../services/cart.service.js';

function resolveCartContext(req) {
  const userId = req.user?.id;
  const sessionId = req.get('x-session-id') || req.cookies?.sessionId;

  if (!userId && !sessionId) {
    throw new ApiError(400, 'Missing session. Provide x-session-id header for guest carts.');
  }

  return { userId, sessionId };
}

export const getCart = asyncHandler(async (req, res) => {
  const context = resolveCartContext(req);
  const cart = await fetchCart(context);
  res.json(cart);
});

export const addCartItem = asyncHandler(async (req, res) => {
  const context = resolveCartContext(req);
  const { productId, quantity } = req.body;

  if (!productId) {
    throw new ApiError(400, 'productId is required');
  }

  const cart = await addItemToCart(context, { productId, quantity });
  res.status(201).json(cart);
});

export const removeCartItem = asyncHandler(async (req, res) => {
  const context = resolveCartContext(req);
  const { itemId } = req.params;
  const cart = await removeItemFromCart(context, { itemId });
  res.json(cart);
});

