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

  // ✅ Add to Cart (treats same product + same size as one, different size = new line)
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.size === product.size
      );

      if (existing) {
        const updated = prev.map((item) =>
          item.id === product.id && item.size === product.size
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

  // ✅ Remove specific product + size from cart
  const removeFromCart = (id, size) => {
    setCartItems((prev) => {
      const updated = prev.filter(
        (item) => !(item.id === id && item.size === size)
      );
      localStorage.setItem("cartItems", JSON.stringify(updated));
      return updated;
    });
  };

  // ✅ Update quantity safely
  const updateQuantity = (id, size, qty) => {
    setCartItems((prev) => {
      const updated = prev.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: Math.max(1, qty) }
          : item
      );
      localStorage.setItem("cartItems", JSON.stringify(updated));
      return updated;
    });
  };

  // ✅ Update product size in cart safely (handles merging if same variant exists)
  const updateSize = (id, oldSize, newSize) => {
    setCartItems((prev) => {
      const sameVariant = prev.find(
        (item) => item.id === id && item.size === newSize
      );

      if (sameVariant) {
        // If same variant already exists, merge quantities
        const updated = prev
          .map((item) => {
            if (item.id === id && item.size === newSize) {
              return { ...item, quantity: item.quantity + 1 };
            }
            if (item.id === id && item.size === oldSize) return null;
            return item;
          })
          .filter(Boolean);

        localStorage.setItem("cartItems", JSON.stringify(updated));
        return updated;
      } else {
        // Otherwise, just update size
        const updated = prev.map((item) =>
          item.id === id && item.size === oldSize
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
