import React from "react";
import HeroSlider from "../components/HeroSlider";
import Categories from "../components/Categories";
import ProductGrid from "../components/ProductGrid";
import Reviews from "../components/Reviews";
import OfferBanner from "../components/OfferBanner";

import products from "../data/products";
import sliderData from "../data/sliderData"; // ✅ Import your separated slider data

const Home = () => {
  return (
    <div className="home-page bg-white text-black">
      {/* 🖼 Hero Section */}
      <HeroSlider slides={sliderData} />

      {/* 🗂 Categories - circular icons linking to category pages */}
      <Categories />

      {/* 🛍 Featured Products */}
      <ProductGrid title="Featured Products" products={products.slice(0, 4)} />

      {/* 🎉 Offer Banner */}
      <OfferBanner />

      {/* 🔥 Trending Products */}
      <ProductGrid title="Trending Products" products={products.slice(4, 8)} />

    
      {/* 💬 Reviews */}
      <Reviews />
    </div>
  );
};

export default Home;
