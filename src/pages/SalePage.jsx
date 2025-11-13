import React from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

const SalePage = () => {
  // ✅ Get top 8 products by highest discount
  const topDiscounted = [...products]
    .sort((a, b) => b.discountPercent - a.discountPercent)
    .slice(0, 8);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ===== Header Section ===== */}
      <div className="bg-gradient-to-r from-[#b18e5a] via-[#faecd7] to-[#b18e5a] text-black py-10 sm:py-14 shadow-md">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide mb-2">
            🔥 Mega Sale Event
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            Grab the biggest discounts on your favorite collections. Limited-time offers on top styles — up to 60% off!
          </p>
        </div>
      </div>

      {/* ===== Sale Badge Section ===== */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-10 text-center">
        <span className="inline-block bg-[#b18e5a] text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-4 sm:py-1.5 rounded-full mb-4">
          Top {topDiscounted.length} Best Discounts
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Exclusive Deals Just For You
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
          Find your perfect fit from our most loved items — now at the biggest savings.
        </p>
      </div>

      {/* ===== Product Grid ===== */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-10">
        {topDiscounted.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {topDiscounted.map((product) => (
              <div key={product.id} className="relative group">
                {/* ✅ Show Only Discount Badge (No Bestseller) */}
                {product.discountPercent && (
                  <span className="absolute top-2 left-2 bg-white text-[#825512] text-[20px] sm:text-xs font-bold px-2 py-1 rounded-md shadow-md z-10">
                    {product.discountPercent}% OFF
                  </span>
                )}

                {/* Product Card */}
                <ProductCard product={{ ...product, isBestseller: false }} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-10 text-base">
            No sale products available.
          </p>
        )}
      </div>

      {/* ===== Call To Action Section ===== */}
      <div className="bg-white border-t border-gray-200 py-10 sm:py-12 mt-4">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
            Don’t Miss Out!
          </h3>
          <p className="text-gray-600 text-sm sm:text-base mb-6 max-w-lg mx-auto">
            These hot deals won’t last forever — explore more from our collections before the sale ends!
          </p>
          <Link
            to="/products"
            className="inline-block bg-[#b18e5a] hover:bg-[#a37a3e] text-white font-semibold text-sm sm:text-base px-6 py-2.5 rounded-lg shadow-md transition"
          >
            Shop All Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SalePage;
