import asyncHandler from '../utils/asyncHandler.js';
import { getProductById, listProducts } from '../services/product.service.js';

export const getProducts = asyncHandler(async (req, res) => {
  const { page, limit, category } = req.query;
  const result = await listProducts({ page, limit, category });
  res.json(result);
});

export const getProduct = asyncHandler(async (req, res) => {
  const product = await getProductById(req.params.id);
  res.json(product);
});

