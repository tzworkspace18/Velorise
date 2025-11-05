import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [isFavourite, setIsFavourite] = useState(false);

  return (
    <Link
      to={product.link}
      className="group relative bg-white border border-gray-100 hover:border-gray-300 transition-all overflow-hidden"
    >
      {/* Product Image Section */}
      <div className="relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-[180px] sm:h-[220px] md:h-[300px] lg:h-[320px] object-cover"
        />

        {/* Bestseller Tag */}
        {product.isBestseller && (
          <span className="absolute top-2 left-2 bg-black text-white text-[10px] sm:text-xs font-semibold px-2 py-1 uppercase tracking-wide">
            Bestseller
          </span>
        )}

        {/* Like (Heart) Icon */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsFavourite(!isFavourite);
            }}
            className="bg-white p-1.5 sm:p-2 rounded-full shadow-sm hover:bg-gray-100 transition"
          >
            {isFavourite ? (
              <FaHeart className="text-red-500 text-sm sm:text-lg" />
            ) : (
              <FaRegHeart className="text-gray-600 text-sm sm:text-lg" />
            )}
          </button>
        </div>
      </div>

      {/* Bottom Product Info */}
      <div className="p-3 sm:p-4 space-y-1 sm:space-y-2">
        {/* Product Name */}
        <h3 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2">
          {product.name}
        </h3>

        {/* Product Description */}
        <p className="text-gray-500 text-[11px] sm:text-xs line-clamp-2">
          {product.description}
        </p>

        {/* Price Section */}
        <div className="flex items-center gap-1 sm:gap-2 mt-1">
          <p className="text-gray-900 font-bold text-xs sm:text-sm">
            ₹{product.discountPrice}
          </p>
          {product.price && (
            <p className="text-gray-400 line-through text-[10px] sm:text-xs">
              ₹{product.price}
            </p>
          )}
          {product.discountPercent && (
            <p className="text-green-600 text-[10px] sm:text-xs font-semibold">
              {product.discountPercent}% <span>off</span>
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
