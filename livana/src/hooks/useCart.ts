import { createContext, createElement, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../types/product';
import { getProductPrice } from '../utils/pricing';

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface CartContextValue {
  cartItems: CartItem[];
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (id: string, size?: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product, size: string, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map((item) => (item === existing ? { ...item, quantity: item.quantity + quantity } : item));
      }
      return [...prev, { product, size, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((id: string, size?: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== id || (size && item.size !== size)));
  }, []);

  const updateQuantity = useCallback((id: string, size: string, quantity: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.product.id === id && item.size === size ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const totals = useMemo(
    () => ({
      totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: cartItems.reduce((sum, item) => sum + getProductPrice(item.product, item.size) * item.quantity, 0),
    }),
    [cartItems],
  );

  const value = useMemo(
    () => ({ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, ...totals }),
    [addToCart, cartItems, removeFromCart, totals, updateQuantity, clearCart],
  );

  return createElement(CartContext.Provider, { value }, children);
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart phải được sử dụng bên trong CartProvider');
  }
  return context;
};
