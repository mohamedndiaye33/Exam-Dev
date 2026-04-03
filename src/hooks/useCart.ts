import { useState, useEffect } from 'react';
import type { Product, CartItem } from '../types';

export const useCart = () => {
  // Initialisation avec le localStorage pour ne pas perdre le panier au refresh
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('gamer-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('gamer-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, qty: number) => {
    if (qty < 1) return;
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: qty } : item));
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return { cart, addToCart, removeFromCart, updateQuantity, totalItems, totalPrice };
};