import { useCartContext } from '../state/CartContext.jsx';

export default function useCart() {
  return useCartContext();
}

