import React from "react";
import { useLike } from "../context/LikeContext";
import ProductCard from "../components/ProductCard";

const FavouritesPage = () => {
  const { likedProducts } = useLike();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 md:px-12 lg:px-20">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">My Favourites</h2>

      {likedProducts.length === 0 ? (
        <p className="text-gray-600">You haven’t liked any products yet ❤️</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {likedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavouritesPage;
