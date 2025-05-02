// src/contexts/CartContext.js
import { createContext, useState, useEffect } from 'react';
// import { useProductContext } from './ProductContext';

export const CartContext = createContext({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  getCartTotal: () => 0,
});

export function CartProvider({ children }) {
  const isBrowser = typeof window !== 'undefined';
//   const { products } = useProductContext(); 

  const [cartItems, setCartItems] = useState(() => {
    if (isBrowser) {
      const storedCartItems = localStorage.getItem('cartItems');
      return storedCartItems ? JSON.parse(storedCartItems) : [];
    }
    return [];
  });

  const addToCart = (item) => {
    const isItemInCart = cartItems.find(cartItem => cartItem.id === item.id);
    if (!isItemInCart) {
      setCartItems(prev => [...prev, { ...item }]);
    }
  };

  const removeFromCart = (item) => {
    setCartItems(prev => prev.filter(cartItem => cartItem.id !== item.id));
  };

  const clearCart = () => setCartItems([]);

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = Number(item.offer_price || item.regular_price || item.price || 0);
      return total + price;
    }, 0);
  };

  // Sync with localStorage
  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
