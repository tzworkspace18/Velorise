import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import productsData from "../data/products";
import ProductCard from "../components/ProductCard";
import { FiFilter } from "react-icons/fi";

const ProductPage = () => {
  const { category } = useParams();

  // ✅ Filters
  const [selectedCategory, setSelectedCategory] = useState(category || "all");
  const [selectedRating, setSelectedRating] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedColor, setSelectedColor] = useState("all");
  const [sortOption, setSortOption] = useState("recommended");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // ✅ Auto-detect categories and colors
  const categories = ["all", ...new Set(productsData.map((p) => p.category))];
  const colors = [
    "all",
    "white",
    "black",
    "blue",
    "red",
    "green",
    "yellow",
    "pink",
    "gray",
    "brown",
  ];

  // ✅ Filter + Sort Logic
  const filteredProducts = useMemo(() => {
    return productsData
      .filter((product) => {
        if (
          selectedCategory !== "all" &&
          product.category.toLowerCase() !== selectedCategory.toLowerCase()
        )
          return false;
        if (selectedRating !== "all" && product.rating < Number(selectedRating))
          return false;
        if (
          product.discountPrice < priceRange[0] ||
          product.discountPrice > priceRange[1]
        )
          return false;
        if (
          selectedColor !== "all" &&
          product.color &&
          product.color.toLowerCase() !== selectedColor.toLowerCase()
        )
          return false;
        return true;
      })
      .sort((a, b) => {
        if (sortOption === "lowToHigh") return a.discountPrice - b.discountPrice;
        if (sortOption === "highToLow") return b.discountPrice - a.discountPrice;
        if (sortOption === "rating") return b.rating - a.rating;
        return 0;
      });
  }, [selectedCategory, selectedRating, priceRange, selectedColor, sortOption]);

  // ✅ Common Filter Content (used in sidebar & mobile)
  const FilterContent = () => (
    <div className="space-y-6 text-sm text-gray-700">
      {/* Category */}
      <div>
        <h4 className="font-semibold mb-2">Category</h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                value={cat}
                checked={selectedCategory === cat}
                onChange={() => setSelectedCategory(cat)}
              />
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h4 className="font-semibold mb-2">
          Price Range (₹{priceRange[0]} - ₹{priceRange[1]})
        </h4>
        <input
          type="range"
          min="0"
          max="200"
          step="10"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          className="w-full accent-gray-800"
        />
      </div>

      {/* Rating */}
      <div>
        <h4 className="font-semibold mb-2">Rating</h4>
        <div className="space-y-2">
          {["all", 4, 3, 2, 1].map((rate) => (
            <label key={rate} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={rate}
                checked={String(selectedRating) === String(rate)}
                onChange={() => setSelectedRating(rate)}
              />
              {rate === "all" ? "All Ratings" : `${rate}+ Stars`}
            </label>
          ))}
        </div>
      </div>

      {/* Colour */}
      <div>
        <h4 className="font-semibold mb-2">Colour</h4>
        <div className="grid grid-cols-5 gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`border w-8 h-8 rounded-full ${
                selectedColor === color
                  ? "ring-2 ring-black"
                  : "hover:ring-1 hover:ring-gray-400"
              }`}
              style={{
                backgroundColor:
                  color === "all" ? "white" : color.toLowerCase(),
              }}
              title={color}
            ></button>
          ))}
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={() => {
          setSelectedCategory("all");
          setSelectedRating("all");
          setSelectedColor("all");
          setPriceRange([0, 200]);
        }}
        className="w-full mt-4 bg-gray-900 text-white py-2 rounded-lg text-sm"
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-3 gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 capitalize">
              {selectedCategory === "all"
                ? "All Products"
                : `${selectedCategory} Collection`}
            </h2>
            <p className="text-sm text-gray-500">
              Showing {filteredProducts.length} items
            </p>
          </div>

          {/* ✅ Refined Mobile Filter + Sort Section */}
          <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-3 sm:gap-4">
            {/* Filter Button (only on mobile) */}
            <button
              className="flex sm:hidden items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 transition"
              onClick={() => setMobileFilterOpen(true)}
            >
              <FiFilter className="text-gray-700 text-base" />
              <span className="text-[15px] font-medium">Filters</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center sm:gap-2 gap-1">
              <label className="hidden sm:block text-sm text-gray-600 font-medium">
                Sort by:
              </label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-[15px] font-medium text-gray-800 shadow-sm bg-white hover:border-gray-400 focus:ring-1 focus:ring-gray-500 outline-none transition"
              >
                <option value="recommended">Recommended</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-6 px-4 py-6">
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden sm:block w-1/5 bg-white border border-gray-100 rounded-lg p-5 h-fit sticky top-20 shadow-sm">
          <FilterContent />
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-10">
              No products found with the selected filters.
            </p>
          )}
        </main>
      </div>

      {/* ✅ Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end sm:hidden">
          <div className="bg-white w-80 max-w-[90%] h-full p-5 overflow-y-auto rounded-l-lg shadow-xl animate-slideIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Filters</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="text-gray-500 text-sm underline"
              >
                Close
              </button>
            </div>
            <FilterContent />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
