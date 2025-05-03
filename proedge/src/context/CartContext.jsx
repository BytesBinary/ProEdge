// src/contexts/CartContext.js
import { createContext, useState, useEffect } from 'react';
// import { useProductContext } from './ProductContext';

export const CartContext = createContext({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  getCartTotal: () => 0,
  wishlistItems: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  isInWishlist: () => false,
});

export function CartProvider({ children }) {
  const isBrowser = typeof window !== 'undefined';
  // const { products } = useProductContext(); 

  // Cart functionality
  const [cartItems, setCartItems] = useState(() => {
    if (isBrowser) {
      const storedCartItems = localStorage.getItem('cartItems');
      return storedCartItems ? JSON.parse(storedCartItems) : [];
    }
    return [];
  });

  // Wishlist functionality
  const [wishlistItems, setWishlistItems] = useState(() => {
    if (isBrowser) {
      const storedWishlistItems = localStorage.getItem('wishlistItems');
      return storedWishlistItems ? JSON.parse(storedWishlistItems) : [];
    }
    return [];
  });

  // Cart methods
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

  // Wishlist methods
  const addToWishlist = (item) => {
    const isItemInWishlist = wishlistItems.find(wishlistItem => wishlistItem.id === item.id);
    if (!isItemInWishlist) {
      setWishlistItems(prev => [...prev, { ...item }]);
    }
  };

  const removeFromWishlist = (item) => {
    setWishlistItems(prev => prev.filter(wishlistItem => wishlistItem.id !== item.id));
  };

  const isInWishlist = (itemId) => {
    return wishlistItems.some(item => item.id === itemId);
  };

  // Sync with localStorage
  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }
  }, [wishlistItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}