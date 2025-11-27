import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products = [], title = "Featured Products" }) => {
  const visible = products.slice(0, 4);

  return (
    <section className="w-full bg-white py-12 md:py-20">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-20 xl:px-28">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
            {title}
          </h3>
          <Link
            to="/products"
            className="text-sm md:text-base text-gray-600 hover:text-gray-800"
          >
            View All
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12 justify-items-center">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
