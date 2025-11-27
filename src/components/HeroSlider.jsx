import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const HeroSlider = ({ slides = [] }) => {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 1024 : false));

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Filter slides to include mobile-only slides only on small screens
  const visibleSlides = slides.filter((s) => (s.mobileOnly ? isMobile : true));

  useEffect(() => {
    if (!visibleSlides.length) return undefined;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % visibleSlides.length);
    }, 4000);
    return () => clearInterval(t);
  }, [visibleSlides.length]);

  // Ensure index is valid when visibleSlides change (e.g., on resize)
  useEffect(() => {
    if (index >= visibleSlides.length) setIndex(0);
  }, [visibleSlides.length, index]);

  const FALLBACK =
    "https://via.placeholder.com/1200x800.png?text=Image+Unavailable";
  if (!visibleSlides.length) return null;

  return (
    <section className="relative w-full overflow-hidden bg-white text-[#b18e5a]">
      <div className="relative min-h-[400px] sm:min-h-[500px] md:h-96 lg:h-[640px]">
        {visibleSlides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            style={{ transform: `translateX(${(i - index) * 100}%)` }}
            aria-hidden={i !== index}
          >
            {/* Background image as an <img> so we can control object-fit/position precisely */}
            <div className="absolute inset-0">
              <img
                src={s.productImage || s.image || FALLBACK}
                alt={s.caption || "slide"}
                className="w-full h-full"
                style={{
                  objectFit: s.fit || 'cover',
                  objectPosition: s.position || 'center right'
                }}
              />
            </div>

            {/* overlay tuned for readability but allowing the image to show */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.18) 45%, rgba(0,0,0,0.02) 100%)' }}
              aria-hidden="true"
            />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 h-full">
              <div className="grid lg:grid-cols-12 items-end h-full gap-6 lg:gap-10">
                {/* Text column - bottom-left on large, centered on small */}
                <div className="lg:col-span-6 flex flex-col justify-end text-center lg:text-left pb-8 lg:pb-12">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-3 md:mb-4 text-white" style={{ textShadow: '0 6px 20px rgba(0,0,0,0.45)' }}>
                    {s.caption || "Trending Now"}
                  </h1>
                  {s.subcaption && (
                    <p className="text-sm sm:text-base md:text-lg text-white/85 mb-4 md:mb-6 max-w-xl mx-auto lg:mx-0">
                      {s.subcaption}
                    </p>
                  )}

                  <div className="flex flex-row flex-wrap items-center gap-3 justify-center lg:justify-start">
                    <a
                      href={s.link || "/products"}
                      target={s.link && s.link.startsWith('http') ? '_blank' : undefined}
                      rel={s.link && s.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-block bg-primary text-white px-6 py-3 rounded-md font-medium text-sm sm:text-base hover:opacity-95 transition"
                    >
                      Shop Now
                    </a>
                    <a
                      href={s.link || "/products"}
                      target={s.link && s.link.startsWith('http') ? '_blank' : undefined}
                      rel={s.link && s.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-block border-2 border-white text-white px-6 py-3 rounded-md font-medium text-sm sm:text-base hover:bg-white/10 transition"
                    >
                      Explore
                    </a>
                  </div>
                </div>

                {/* right column intentionally empty — background image provides visual */}
                <div className="lg:col-span-6" aria-hidden="true" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        aria-label="Previous slide"
        onClick={() => setIndex((index - 1 + visibleSlides.length) % visibleSlides.length)}
        className="absolute left-3 sm:left-6 top-1/2 transform -translate-y-1/2 bg-black text-white hover:bg-gray-800 rounded-full p-1.5 sm:p-2 md:p-3 z-20"
      >
        <FiChevronLeft size={18} />
      </button>
      <button
        aria-label="Next slide"
        onClick={() => setIndex((index + 1) % visibleSlides.length)}
        className="absolute right-3 sm:right-6 top-1/2 transform -translate-y-1/2 bg-black text-white hover:bg-gray-800 rounded-full p-1.5 sm:p-2 md:p-3 z-20"
      >
        <FiChevronRight size={18} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {visibleSlides.map((_, i) => (
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
