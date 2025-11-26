import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const HeroSlider = ({ slides = [] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4000);
    return () => clearInterval(t);
  }, [slides.length]);

  const FALLBACK =
    "https://via.placeholder.com/1200x800.png?text=Image+Unavailable";
  if (!slides.length) return null;

  return (
    <section className="relative w-full overflow-hidden bg-white text-[#b18e5a]">
      <div className="relative min-h-[400px] sm:min-h-[500px] md:h-96 lg:h-[640px]">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            style={{ transform: `translateX(${(i - index) * 100}%)` }}
            aria-hidden={i !== index}
          >
            {/* Background */}
            <div className="absolute inset-0 bg-white" />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-20 flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
              
              {/* 🧩 Text Section */}
              <div className="order-2 lg:order-1 lg:col-span-6 text-center lg:text-left">
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight mb-3 md:mb-4">
                  {s.caption || "Trending Now"}
                </h1>
                {s.subcaption && (
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 md:mb-6">
                    {s.subcaption}
                  </p>
                )}
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
                  <a
                    href={s.link || "/products"}
                    className="inline-block bg-[#faecd7] text-black px-5 py-2.5 sm:px-6 sm:py-3 rounded-md font-medium text-sm sm:text-base hover:bg-[#ba945b]  transition"
                  >
                    Shop Now
                  </a>
                  <a
                    href={s.link || "/products"}
                    className="inline-block border-2 border-[#faecd7] text-black px-5 py-2.5 sm:px-6 sm:py-3 rounded-md font-medium text-sm sm:text-base hover:bg-[#ba945b] transition"
                  >
                    Explore
                  </a>
                </div>
              </div>

              {/* 🖼 Image Section */}
              <div className="order-1 lg:order-2 lg:col-span-6 flex justify-center lg:justify-end">
                <div className="w-full max-w-sm bg-white border border-gray-100 overflow-hidden rounded-xl shadow-sm">
                  <a href={s.link || "/products"} className="block">
                    <img
                      src={s.productImage || s.image || FALLBACK}
                      alt={s.caption || "Product"}
                      className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-cover"
                    />
                  </a>
                  <div className="p-4 sm:p-5">
                    <h3 className="text-gray-900 font-semibold text-base sm:text-lg">
                      {s.caption || "Featured Product"}
                    </h3>
                    {s.subcaption && (
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        {s.subcaption}
                      </p>
                    )}
                    <div className="mt-3 sm:mt-4 flex items-center justify-between">
                      {s.price && (
                        <span className="text-sm sm:text-lg font-bold text-gray-900">
                          ₹{s.price}
                        </span>
                      )}
                      <a
                        href={s.link || "/products"}
                        className="bg-[#faecd7] text-black px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-[#ba945b] "
                      >
                        View
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        aria-label="Previous slide"
        onClick={() => setIndex((index - 1 + slides.length) % slides.length)}
        className="absolute left-3 sm:left-6 top-1/2 transform -translate-y-1/2 bg-black text-white hover:bg-gray-800 rounded-full p-1.5 sm:p-2 md:p-3 z-20"
      >
        <FiChevronLeft size={18} />
      </button>
      <button
        aria-label="Next slide"
        onClick={() => setIndex((index + 1) % slides.length)}
        className="absolute right-3 sm:right-6 top-1/2 transform -translate-y-1/2 bg-black text-white hover:bg-gray-800 rounded-full p-1.5 sm:p-2 md:p-3 z-20"
      >
        <FiChevronRight size={18} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${
              i === index ? "bg-black" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
