import { useState, useEffect, useCallback } from 'react';
import { CartItem, MenuItem, SpiceLevel } from './types';
import { loadSavedCart, saveCart, calculateCartCount, calculateCartTotal } from './cart';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => loadSavedCart());

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const addToCart = useCallback((item: MenuItem, spiceLevel?: SpiceLevel) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (ci) => ci.item.id === item.id && ci.spiceLevel === spiceLevel
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + 1,
        };
        return next;
      }
      return [...prev, { item, quantity: 1, spiceLevel }];
    });
  }, []);

  const updateQuantity = useCallback((index: number, newQty: number) => {
    if (newQty <= 0) {
      setItems((prev) => prev.filter((_, i) => i !== index));
      return;
    }
    setItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], quantity: newQty };
      return next;
    });
  }, []);

  const removeItem = useCallback((index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const count = calculateCartCount(items);
  const total = calculateCartTotal(items);

  return {
    items,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    count,
    total,
  };
}

export function useScrolled(threshold = 20): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
}
