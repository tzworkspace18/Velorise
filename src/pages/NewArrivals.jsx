import React from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  // ✅ Get the last 12 products dynamically
  const latestProducts = [...products].slice(-12).reverse();

  return (
    <div className="bg-white min-h-screen">
      {/* ====== Page Header Section ====== */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-500">
                <Link to="/" className="hover:underline hover:text-gray-800">
                  Home
                </Link>{" "}
                / <span className="text-gray-800 font-medium">New Arrivals</span>
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
                ✨ New Arrivals
              </h1>
              <p className="text-gray-600 text-sm sm:text-base mt-1">
                Discover our latest collection — fresh styles and premium designs just for you.
              </p>
            </div>

            {/* Optional CTA Button */}
            <Link
              to="/products"
              className="hidden sm:block mt-4 sm:mt-0 bg-[#faecd7] text-black text-sm font-semibold px-5 py-2.5 rounded-lg shadow hover:bg-gray-800 hover:text-white transition"
            >
              Shop All Products
            </Link>
          </div>
        </div>
      </div>

      {/* ====== Product Grid Section ====== */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-10">
        {latestProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {latestProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-10 text-base">
            No new arrivals available.
          </p>
        )}
      </div>

      {/* ====== Bottom Section: You May Also Like ====== */}
      <div className="bg-white border-t border-gray-200 mt-8 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
            You May Also Like
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto mb-6">
            Check out more trending collections and curated styles designed to inspire your wardrobe.
          </p>
          <Link
            to="/products"
            className="inline-block bg-[#faecd7] text-black text-sm font-semibold px-6 py-2.5 rounded-lg shadow hover:bg-gray-800 hover:text-white transition"
          >
            Explore More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
