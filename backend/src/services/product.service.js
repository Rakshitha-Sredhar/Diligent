import Product from '../models/product.model.js';
import ApiError from '../utils/ApiError.js';

export async function listProducts({ page = 1, limit = 20, category } = {}) {
  const query = { isActive: true };

  if (category) {
    query.category = category;
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [items, total] = await Promise.all([
    Product.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Product.countDocuments(query)
  ]);

  return {
    items,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  };
}

export async function getProductById(productId) {
  const product = await Product.findById(productId);

  if (!product || !product.isActive) {
    throw new ApiError(404, 'Product not found');
  }

  return product;
}

