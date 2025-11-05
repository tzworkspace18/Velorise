import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import reviews from "../data/reviewsData"; // ✅ imported data

const Reviews = () => {
  const [index, setIndex] = useState(0);
  const [viewAll, setViewAll] = useState(false);

  const nextReview = () => {
    setIndex((prev) => (prev + 2 >= reviews.length ? 0 : prev + 2));
  };

  const prevReview = () => {
    setIndex((prev) => (prev - 2 < 0 ? reviews.length - 2 : prev - 2));
  };

  return (
    <section className="bg-white py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center relative">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3">
          What people Think <span className="text-red-500">About Us</span>
        </h2>
        <div className="w-24 h-[3px] bg-red-500 mx-auto mb-10"></div>

        {/* Review Cards */}
        <div className="relative flex justify-center items-center gap-6">
          {!viewAll && (
            <>
              {/* Left Arrow (Desktop) */}
              <button
                onClick={prevReview}
                className="hidden md:flex absolute left-0 -translate-y-1/2 top-1/2 bg-white border border-red-500 text-red-500 p-2.5 rounded-full hover:bg-red-50 transition"
              >
                <FiChevronLeft size={18} />
              </button>

              {/* Two Reviews Visible */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
                {reviews.slice(index, index + 2).map((r) => (
                  <div
                    key={r.id}
                    className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all text-left relative"
                  >
                    {/* Rating */}
                    <div className="flex items-center text-yellow-400 mb-2">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <FaStar key={i} className="text-yellow-400" />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                      {r.text}
                    </p>

                    {/* Reviewer Info */}
                    <div className="flex items-center gap-3 mt-auto">
                      <img
                        src={r.image}
                        alt={r.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-gray-900 font-semibold">{r.name}</p>
                        <p className="text-gray-500 text-sm">{r.role}</p>
                      </div>
                    </div>

                    {/* Date */}
                    <span className="absolute top-4 right-5 text-xs text-gray-400">
                      {r.date}
                    </span>
                  </div>
                ))}
              </div>

              {/* Right Arrow (Desktop) */}
              <button
                onClick={nextReview}
                className="hidden md:flex absolute right-0 -translate-y-1/2 top-1/2 bg-white border border-red-500 text-red-500 p-2.5 rounded-full hover:bg-red-50 transition"
              >
                <FiChevronRight size={18} />
              </button>
            </>
          )}

          {/* View All Mode */}
          {viewAll && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all text-left relative"
                >
                  <div className="flex items-center text-yellow-400 mb-2">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <FaStar key={i} className="text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    {r.text}
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    <img
                      src={r.image}
                      alt={r.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-gray-900 font-semibold">{r.name}</p>
                      <p className="text-gray-500 text-sm">{r.role}</p>
                    </div>
                  </div>
                  <span className="absolute top-4 right-5 text-xs text-gray-400">
                    {r.date}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 👇 Mobile Arrows - Centered Above View All Button */}
        {!viewAll && (
          <div className="flex justify-center gap-3 mt-10 md:hidden">
            <button
              onClick={prevReview}
              className="bg-white border border-red-500 text-red-500 p-2.5 rounded-full hover:bg-red-50 transition"
            >
              <FiChevronLeft size={18} />
            </button>
            <button
              onClick={nextReview}
              className="bg-white border border-red-500 text-red-500 p-2.5 rounded-full hover:bg-red-50 transition"
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        )}

        {/* View All Button */}
        <div className="mt-8">
          <button
            onClick={() => setViewAll(!viewAll)}
            className="bg-red-500 text-white px-6 py-1.5 rounded-full font-medium text-sm hover:bg-red-600 transition"
          >
            {viewAll ? "Show Less" : "View All"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
