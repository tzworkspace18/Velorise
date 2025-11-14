import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FiHeart, FiTruck, FiRotateCcw, FiPackage } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import products from "../data/products";
import Reviews from "../components/Reviews";
import ProductGrid from "../components/ProductGrid";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart } = useCart();

  const [mainImage, setMainImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(
    product.colors ? product.colors[0] : null
  );
  const [isFav, setIsFav] = useState(false);

  if (!product) {
    return (
      <div className="text-center py-20 text-gray-600">Product not found.</div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }
    if (!selectedColor) {
      alert("Please select a colour before adding to cart.");
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.discountPrice,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
    });
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-20 py-10">
        <p className="text-sm text-gray-500 mb-6">
          Home &gt; <span className="text-black font-semibold">Product</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Section */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* ✅ Mobile View: main image first, 3 thumbnails below */}
            <div className="w-full flex flex-col items-center md:hidden">
              <div className="w-full flex justify-center border border-gray-100 p-4 mb-3">
                <img
                  src={mainImage}
                  alt={product.name}
                  className="max-w-[350px] w-full h-auto object-contain"
                />
              </div>

              {/* 3 images in a row */}
              <div className="flex justify-center gap-3">
                {product.images.slice(0, 3).map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={product.name}
                    onClick={() => setMainImage(img)}
                    className={`w-20 h-24 border rounded-md cursor-pointer object-cover ${
                      mainImage === img
                        ? "border-gray-900"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* ✅ Desktop View (unchanged) */}
            <div className="hidden md:flex gap-4">
              <div className="flex flex-col gap-3 overflow-y-auto h-[450px]">
                {product.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={product.name}
                    onClick={() => setMainImage(img)}
                    className={`w-20 h-28 border cursor-pointer object-cover ${
                      mainImage === img
                        ? "border-gray-900"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  />
                ))}
              </div>

              <div className="flex-1 flex items-center justify-center border border-gray-100 p-4">
                <img
                  src={mainImage}
                  alt={product.name}
                  className="w-full max-h-[550px] object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col">
            {product.isBestseller && (
              <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                ONLY ON SHOP.CO
              </span>
            )}

            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-1">
              {product.name}
            </h1>

            <p className="text-gray-500 text-sm mb-3">
              {product.description.slice(0, 80)}...
            </p>

            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl font-bold text-gray-900">
                ₹{product.discountPrice}
              </span>
              {product.price && (
                <span className="text-gray-400 line-through text-lg">
                  ₹{product.price}
                </span>
              )}
              {product.discountPercent && (
                <span className="text-green-600 font-semibold text-base">
                  {product.discountPercent}% Off
                </span>
              )}
            </div>

            <p className="text-xs text-gray-500 mb-6">MRP includes all taxes</p>

            {/* Size Selection */}
            <div className="mb-5">
              <h3 className="font-semibold text-gray-800 text-sm mb-2">
                Select Size
              </h3>
              <div className="flex gap-3 flex-wrap">
                {["XS", "S", "M", "L", "XL", "2XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 border text-sm font-medium rounded-full ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "border-gray-300 text-gray-700 hover:border-gray-500"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Colour Section */}
            {product.colors && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 text-sm mb-2">
                  Select Colour
                </h3>
                <div className="flex gap-3 flex-wrap">
                  {product.colors.map((col) => (
                    <button
                      key={col}
                      onClick={() => setSelectedColor(col)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor === col
                          ? "border-black ring-1 ring-gray-800"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: col }}
                      title={col}
                    ></button>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist + Add to Bag */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => setIsFav(!isFav)}
                className={`flex items-center justify-center gap-2 border border-gray-300 px-5 py-3 w-1/2 text-sm font-medium ${
                  isFav ? "text-red-500" : "text-gray-700"
                }`}
              >
                <FiHeart className="text-lg" />
                Add to Wishlist
              </button>

              <button
                onClick={handleAddToCart}
                className="w-1/2 bg-black text-white font-semibold py-3 text-sm hover:bg-gray-800 transition"
              >
                Add to Bag
              </button>
            </div>

            {/* Delivery Info */}
            <div className="border-t border-gray-200 pt-6 grid grid-cols-3 gap-3 text-center text-sm text-gray-700">
              <div className="flex flex-col items-center">
                <FiTruck className="text-2xl mb-1 text-gray-700" />
                <p className="font-semibold">COD available</p>
              </div>
              <div className="flex flex-col items-center">
                <FiRotateCcw className="text-2xl mb-1 text-gray-700" />
                <p className="font-semibold">7-day return</p>
              </div>
              <div className="flex flex-col items-center">
                <FiPackage className="text-2xl mb-1 text-gray-700" />
                <p className="font-semibold">Ships in 1 day</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 ">
        <Reviews />
      </div>
      <div className="border-t border-gray-200 mt-10">
        <ProductGrid title="More Products" products={products.slice(0, 4)} />
      </div>
    </div>
  );
};

export default ProductDetails;
