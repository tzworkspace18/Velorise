import React, { createContext, useContext, useState, useEffect } from "react";

const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
  const [likedProducts, setLikedProducts] = useState([]);

  // 🧠 Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("likedProducts");
    if (stored) setLikedProducts(JSON.parse(stored));
  }, []);

  // 💾 Save to localStorage
  useEffect(() => {
    localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
  }, [likedProducts]);

  const toggleLike = (product) => {
    setLikedProducts((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isLiked = (id) => likedProducts.some((p) => p.id === id);

  return (
    <LikeContext.Provider value={{ likedProducts, toggleLike, isLiked }}>
      {children}
    </LikeContext.Provider>
  );
};

export const useLike = () => useContext(LikeContext);
