import api from './apiClient.js';

export async function fetchCart() {
  const response = await api.get('/cart');
  return response.data;
}

export async function addToCart(payload) {
  const response = await api.post('/cart', payload);
  return response.data;
}

export async function removeFromCart(itemId) {
  const response = await api.delete(`/cart/${itemId}`);
  return response.data;
}

