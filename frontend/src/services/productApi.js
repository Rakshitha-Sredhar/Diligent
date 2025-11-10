import api from './apiClient.js';

export async function fetchProducts(params = {}) {
  const response = await api.get('/products', { params });
  return response.data;
}

export async function fetchProduct(productId) {
  const response = await api.get(`/products/${productId}`);
  return response.data;
}

