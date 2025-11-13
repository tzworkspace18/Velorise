import React from "react";
import { Link } from "react-router-dom";

const OfferBanner = () => {
  return (
    <section className="relative bg-gradient-to-r from-[#b18e5a] via-[#faecd7] to-[#b18e5a] text-black text-center py-10 sm:py-14 overflow-hidden">
      {/* Decorative texture overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

      {/* Offer Content */}
      <div className="relative z-10 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
          🎉 Festive Offer – 20% OFF on New Arrivals 🎉
        </h2>
        <p className="text-sm sm:text-base text-gray-700 mb-6 max-w-xl mx-auto">
          Shop the latest fashion trends and enjoy exclusive discounts for a
          limited time only!
        </p>
        <Link
          to="/products"
          className="inline-block bg-white text-[#b18e5a] font-semibold px-6 py-2.5 rounded-full shadow-md hover:bg-gray-100 transition"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default OfferBanner;
