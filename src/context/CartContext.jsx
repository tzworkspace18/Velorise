// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // ✅ Load from localStorage initially
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Persist cart automatically
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Add to Cart (treats same product + same size + same color as one)
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.id === product.id &&
          item.size === product.size &&
          item.color === product.color
      );

      if (existing) {
        const updated = prev.map((item) =>
          item.id === product.id &&
          item.size === product.size &&
          item.color === product.color
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
        localStorage.setItem("cartItems", JSON.stringify(updated));
        return updated;
      } else {
        const updated = [...prev, { ...product, quantity: product.quantity || 1 }];
        localStorage.setItem("cartItems", JSON.stringify(updated));
        return updated;
      }
    });
  };

  // ✅ Remove product by id + size + color
  const removeFromCart = (id, size, color) => {
    setCartItems((prev) => {
      const updated = prev.filter(
        (item) => !(item.id === id && item.size === size && item.color === color)
      );
      localStorage.setItem("cartItems", JSON.stringify(updated));
      return updated;
    });
  };

  // ✅ Update quantity safely (by id + size + color)
  const updateQuantity = (id, size, color, qty) => {
    setCartItems((prev) => {
      const updated = prev.map((item) =>
        item.id === id && item.size === size && item.color === color
          ? { ...item, quantity: Math.max(1, qty) }
          : item
      );
      localStorage.setItem("cartItems", JSON.stringify(updated));
      return updated;
    });
  };

  // ✅ Update product size safely (handles merging with same id + color)
  const updateSize = (id, oldSize, newSize, color) => {
    setCartItems((prev) => {
      const sameVariant = prev.find(
        (item) => item.id === id && item.size === newSize && item.color === color
      );

      if (sameVariant) {
        const updated = prev
          .map((item) => {
            if (item.id === id && item.size === newSize && item.color === color) {
              return { ...item, quantity: item.quantity + 1 };
            }
            if (item.id === id && item.size === oldSize && item.color === color)
              return null;
            return item;
          })
          .filter(Boolean);

        localStorage.setItem("cartItems", JSON.stringify(updated));
        return updated;
      } else {
        const updated = prev.map((item) =>
          item.id === id && item.size === oldSize && item.color === color
            ? { ...item, size: newSize }
            : item
        );
        localStorage.setItem("cartItems", JSON.stringify(updated));
        return updated;
      }
    });
  };

  // ✅ Clear cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  // ✅ Total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateSize,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
