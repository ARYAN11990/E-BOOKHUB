'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Course } from '@/data/mockCourses';

interface CartItem extends Course {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (course: Course) => void;
  removeFromCart: (courseId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isMounted: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Load from local storage
  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem('learnora_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart");
      }
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('learnora_cart', JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  const addToCart = (course: Course) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === course.id);
      if (existing) {
        // Digital products usually don't need quantity > 1
        return prev;
      }
      return [...prev, { ...course, quantity: 1 }];
    });
    alert(`Added "${course.title}" to cart!`);
  };

  const removeFromCart = (courseId: string) => {
    setCart(prev => prev.filter(item => item.id !== courseId));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => total + item.currentPrice, 0);
  const cartCount = cart.length;

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal, cartCount, isMounted }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
