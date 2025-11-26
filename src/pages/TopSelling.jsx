import React from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

const TopSelling = () => {
  // ✅ Get products marked as Bestseller
  const bestsellerProducts = products.filter((p) => p.isBestseller);

  return (
    <div className="bg-white min-h-screen">
      {/* ===== Header Section ===== */}
      <div className="relative bg-gradient-to-r from-[#b18e5a] via-[#faecd7] to-[#b18e5a] text-black py-12 sm:py-16 shadow-md overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/connected.png')] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide mb-3">
            🌟 Top Selling Collection
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-black-50 max-w-2xl mx-auto">
            Explore our most loved products that have been trending and selling fast —  
            handpicked favorites just for you.
          </p>
        </div>
      </div>

      {/* ===== Section Title ===== */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-10 text-center">
        <span className="inline-block bg-[#b18e5a] text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-3 shadow-sm">
          Bestseller Collection
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Top Rated & Most Loved
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
          From timeless classics to trending styles — these are the items our customers adore the most.
        </p>
      </div>

      {/* ===== Product Grid ===== */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-10">
        {bestsellerProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {bestsellerProducts.map((product) => (
              <div key={product.id} className="relative group">
                {/* 🧩 Removed Bestseller Tag — Only show ProductCard */}
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-10 text-base">
            No bestseller products found.
          </p>
        )}
      </div>

      {/* ===== Call To Action Section ===== */}
      <div className="bg-white border-t border-gray-200 py-10 sm:py-12 mt-4">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
            Loved by Thousands of Customers
          </h3>
          <p className="text-gray-600 text-sm sm:text-base mb-6 max-w-lg mx-auto">
            Join the trendsetters and explore why these top-selling styles are flying off the shelves.
          </p>
          <Link
            to="/products"
            className="inline-block bg-[#faecd7] text-black rounded-md hover:bg-[#ba945b]  font-semibold text-sm sm:text-base px-6 py-2.5 rounded-lg shadow-md transition"
          >
            Browse All Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopSelling;
