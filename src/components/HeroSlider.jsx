import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const HeroSlider = ({ slides = [] }) => {
  const [index, setIndex] = useState(0);

  // ✅ Only use first 3 slides (if more are passed)
  const visibleSlides = slides.slice(0, 3);

  useEffect(() => {
    if (!visibleSlides.length) return;

    const t = setInterval(() => {
      setIndex((i) => (i + 1) % visibleSlides.length);
    }, 4000);

    return () => clearInterval(t);
  }, [visibleSlides.length]);

  useEffect(() => {
    if (index >= visibleSlides.length) setIndex(0);
  }, [visibleSlides.length, index]);

  const FALLBACK =
    "https://via.placeholder.com/1200x800.png?text=Image+Unavailable";
  if (!visibleSlides.length) return null;

  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="relative min-h-[420px] sm:min-h-[520px] md:min-h-[620px] lg:min-h-[700px]">
        {visibleSlides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            style={{ transform: `translateX(${(i - index) * 100}%)` }}
          >
            {/* FULL COVER IMAGE */}
            <img
              src={s.productImage || s.image || FALLBACK}
              alt={s.caption || "slide"}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />

            {/* DESKTOP CARD: LEFT CENTER, HIDDEN ON MOBILE */}
            <div className="hidden lg:block absolute left-16 top-1/2 -translate-y-1/2 z-20">
              <div className="bg-white/70 backdrop-blur-md p-6 rounded-lg max-w-sm shadow-lg">
                <h1 className="text-3xl font-bold text-black mb-2 leading-tight">
                  {s.caption || "Trending Now"}
                </h1>

                {s.subcaption && (
                  <p className="text-base text-black/80 mb-4">
                    {s.subcaption}
                  </p>
                )}

                <div className="flex gap-3">
                  <a
                    href={s.link || "/products"}
                    className="bg-primary text-black px-4 py-2 rounded-md text-sm font-semibold shadow-sm hover:opacity-90"
                  >
                    Shop Now
                  </a>

                  <a
                    href={s.link || "/products"}
                    className="border border-black text-black px-4 py-2 rounded-md text-sm font-semibold hover:bg-black/10"
                  >
                    Explore
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CONTROLS */}
      <button
        aria-label="Previous slide"
        onClick={() =>
          setIndex((index - 1 + visibleSlides.length) % visibleSlides.length)
        }
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 bg-black text-white hover:bg-gray-800 rounded-full p-2 md:p-3 z-30"
      >
        <FiChevronLeft size={20} />
      </button>

      <button
        aria-label="Next slide"
        onClick={() => setIndex((index + 1) % visibleSlides.length)}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 bg-black text-white hover:bg-gray-800 rounded-full p-2 md:p-3 z-30"
      >
        <FiChevronRight size={20} />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
        {visibleSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-black" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
