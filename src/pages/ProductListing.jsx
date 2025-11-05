import React from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/products"; // Your existing product data file

const ProductListing = () => {
  return (
  <div className="container mx-auto px-4 py-12 md:py-20">
      <h2 className="text-2xl font-bold mb-6">Our Products</h2>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
