import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import { addToCart, fetchCart, removeFromCart } from '../services/cartApi.js';
import { setSessionHeader } from '../services/apiClient.js';

const CartContext = createContext();

const initialState = {
  cart: null,
  loading: false,
  error: null,
  sessionId: null
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'SET_SESSION':
      return { ...state, sessionId: action.payload };
    case 'REQUEST_START':
      return { ...state, loading: true, error: null };
    case 'REQUEST_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'SET_CART':
      return { ...state, loading: false, cart: action.payload, error: null };
    default:
      return state;
  }
}

function ensureSessionId() {
  const storageKey = 'diligent-session-id';
  let sessionId = window.localStorage.getItem(storageKey);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    window.localStorage.setItem(storageKey, sessionId);
  }
  return sessionId;
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const refreshCart = useCallback(async () => {
    dispatch({ type: 'REQUEST_START' });
    try {
      const data = await fetchCart();
      dispatch({ type: 'SET_CART', payload: data });
    } catch (error) {
      dispatch({ type: 'REQUEST_ERROR', payload: error.message });
    }
  }, []);

  const addItem = useCallback(
    async ({ productId, quantity = 1 }) => {
      dispatch({ type: 'REQUEST_START' });
      try {
        const data = await addToCart({ productId, quantity });
        dispatch({ type: 'SET_CART', payload: data });
      } catch (error) {
        dispatch({ type: 'REQUEST_ERROR', payload: error.message });
        throw error;
      }
    },
    []
  );

  const removeItem = useCallback(async (itemId) => {
    dispatch({ type: 'REQUEST_START' });
    try {
      const data = await removeFromCart(itemId);
      dispatch({ type: 'SET_CART', payload: data });
    } catch (error) {
      dispatch({ type: 'REQUEST_ERROR', payload: error.message });
      throw error;
    }
  }, []);

  const value = useMemo(
    () => ({
      cart: state.cart,
      loading: state.loading,
      error: state.error,
      sessionId: state.sessionId,
      addItem,
      removeItem,
      refreshCart
    }),
    [state, addItem, removeItem, refreshCart]
  );

  useEffect(() => {
    const sessionId = ensureSessionId();
    setSessionHeader(sessionId);
    dispatch({ type: 'SET_SESSION', payload: sessionId });
    refreshCart();
  }, [refreshCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

CartProvider.propTypes = {
  children: PropTypes.node
};

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
}

