import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FiHeart, FiTruck, FiRotateCcw, FiPackage } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import products from "../data/products";

// ✅ Import ready-made sections
import Reviews from "../components/Reviews";
import ProductGrid from "../components/ProductGrid";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart } = useCart();

  const [mainImage, setMainImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isFav, setIsFav] = useState(false);

  if (!product) {
    return (
      <div className="text-center py-20 text-gray-600">
        Product not found.
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-20 py-10">
        {/* Breadcrumb */}
        <p className="text-sm text-gray-500 mb-6">
          Home &gt; <span className="text-black font-semibold">Product</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Side — Image Section */}
          <div className="flex gap-4">
            {/* Thumbnail List */}
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

            {/* Main Image */}
            <div className="flex-1 flex items-center justify-center border border-gray-100 p-4">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full max-h-[550px] object-contain"
              />
            </div>
          </div>

          {/* Right Side — Product Info */}
          <div className="flex flex-col">
            {/* Title + Tag */}
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

            {/* Price */}
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
            <p className="text-xs text-gray-500 mb-6">
              MRP includes all taxes
            </p>

            {/* Size Selection */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-800 text-sm">
                  Select Size
                </h3>
                <span className="text-pink-600 text-sm cursor-pointer">
                  Size Guide
                </span>
              </div>
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

            {/* Model Details */}
            <div className="border border-gray-200 p-3 flex items-center gap-3 mb-6">
              <img
                src={product.images[0]}
                alt="model"
                className="w-12 h-16 object-cover rounded"
              />
              <p className="text-sm text-gray-700">
                <strong>MODEL DETAILS:</strong> Model height is 5’8” and is
                wearing size S.
              </p>
            </div>

            {/* Wishlist + Add to Bag Buttons */}
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
                onClick={() =>
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.discountPrice,
                    image: product.images[0],
                    size: selectedSize,
                    quantity: 1,
                  })
                }
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
                <span className="text-pink-600 text-xs cursor-pointer">
                  Know More
                </span>
              </div>
              <div className="flex flex-col items-center">
                <FiRotateCcw className="text-2xl mb-1 text-gray-700" />
                <p className="font-semibold">7-day return</p>
                <span className="text-pink-600 text-xs cursor-pointer">
                  Know More
                </span>
              </div>
              <div className="flex flex-col items-center">
                <FiPackage className="text-2xl mb-1 text-gray-700" />
                <p className="font-semibold">Ships in 1 day</p>
                <span className="text-pink-600 text-xs cursor-pointer">
                  Know More
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 💬 Review Section */}
      <div className="border-t border-gray-200 mt-10">
        <Reviews />
      </div>

      {/* 🔥 Trending Products Section */}
      <div className="border-t border-gray-200 mt-10">
        <ProductGrid
          title="Trending Products"
          products={products.slice(0, 4)}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
