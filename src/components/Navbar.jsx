import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiChevronDown,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useLike } from "../context/LikeContext";

const Navbar = () => {
  const { cartItems } = useCart();
  const { likedProducts } = useLike();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const likeCount = likedProducts.length;

  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [ourProductOpen, setOurProductOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);
  const [mobileOurProductOpen, setMobileOurProductOpen] = useState(false);

  const location = useLocation();

  const toggleMobileMenu = () => setMobileMenuOpen((v) => !v);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    closeMobileMenu();
    setMobileCollectionsOpen(false);
    setMobileOurProductOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", mobileMenuOpen);
  }, [mobileMenuOpen]);

  return (
    <nav className="bg-white relative z-50">
      {/* ===== Desktop Navbar ===== */}
      <div className="hidden md:flex container mx-auto px-14 py-8 items-center justify-between">
        <Link to="/" className="text-3xl font-bold uppercase text-gray-800">
          VELORISE
        </Link>

        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-gray-600">
            Home
          </Link>
          <Link to="/new-arrivals" className="hover:text-gray-600">
            New Arrivals
          </Link>

          {/* ✅ Collections Dropdown with Hover Delay */}
          <div
            className="relative"
            onMouseEnter={() => {
              clearTimeout(window.collectionTimer);
              setCollectionsOpen(true);
            }}
            onMouseLeave={() => {
              window.collectionTimer = setTimeout(() => {
                setCollectionsOpen(false);
              }, 400); // delay before closing
            }}
          >
            <button className="flex items-center hover:text-gray-600">
              Collections <FiChevronDown className="ml-1 text-gray-700" />
            </button>
            {collectionsOpen && (
              <div className="absolute top-full left-0 bg-white border rounded mt-2 py-2 w-48 z-50 shadow-md transition-all duration-300 ease-out">
                <Link
                  to="/products/men"
                  className="block px-4 py-1 hover:bg-[#fae4c3]"
                >
                  Men
                </Link>
                <Link
                  to="/products/women"
                  className="block px-4 py-1 hover:bg-[#fae4c3]"
                >
                  Women
                </Link>
                <Link
                  to="/products/kids"
                  className="block px-4 py-1 hover:bg-[#fae4c3]"
                >
                  Kids
                </Link>
              </div>
            )}
          </div>

          <Link to="/sale" className="hover:text-gray-600">
            Sale
          </Link>
          <Link to="/top-selling" className="hover:text-gray-600">
            TopSelling
          </Link>

          {/* ✅ Our Product Dropdown with Hover Delay */}
          <div
            className="relative"
            onMouseEnter={() => {
              clearTimeout(window.ourProductTimer);
              setOurProductOpen(true);
            }}
            onMouseLeave={() => {
              window.ourProductTimer = setTimeout(() => {
                setOurProductOpen(false);
              }, 400); // delay before closing
            }}
          >
            <button className="flex items-center hover:text-gray-600">
              Our Product <FiChevronDown className="ml-1 text-gray-700" />
            </button>
            {ourProductOpen && (
              <div className="absolute top-full left-0 bg-white border rounded mt-2 py-2 w-48 z-50 shadow-md transition-all duration-300 ease-out">
                <Link
                  to="/our-product/clothing"
                  className="block px-4 py-1 hover:bg-[#fae4c3]"
                >
                  Clothing
                </Link>
                <Link
                  to="/our-product/watches"
                  className="block px-4 py-1 hover:bg-[#fae4c3]"
                >
                  Watches
                </Link>
                <Link
                  to="/our-product/perfume"
                  className="block px-4 py-1 hover:bg-[#fae4c3]"
                >
                  Perfume
                </Link>
                <Link
                  to="/our-product/footwear"
                  className="block px-4 py-1 hover:bg-[#fae4c3]"
                >
                  Footwear
                </Link>
                <Link
                  to="/our-product/handicraft"
                  className="block px-4 py-1 hover:bg-[#fae4c3]"
                >
                  Handicraft
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* ===== Desktop Icons ===== */}
        <div className="flex items-center space-x-6 relative">
          <Link to="/search" className="text-gray-700 hover:text-gray-900">
            <FiSearch size={24} />
          </Link>
          <Link
            to="/favourites"
            className="relative text-gray-700 hover:text-gray-900"
          >
            <FiHeart size={24} />
            {likeCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
                {likeCount}
              </span>
            )}
          </Link>
          <Link
            to="/cart"
            className="relative text-gray-700 hover:text-gray-900"
          >
            <FiShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/login" className="text-gray-700 hover:text-gray-900">
            <FiUser size={24} />
          </Link>
        </div>
      </div>

      {/* ===== Mobile Header ===== */}
      <div className="flex md:hidden items-center justify-between px-4 py-3 border-b">
        <Link to="/" className="text-xl font-bold uppercase text-gray-800 pl-3">
          VELORISE
        </Link>
        <div className="flex items-center space-x-4 pr-3">
          <Link
            to="/cart"
            className="relative text-gray-700 hover:text-gray-900"
          >
            <FiShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-semibold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <button onClick={toggleMobileMenu} aria-label="Toggle Menu">
            {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* ===== Mobile Menu ===== */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col justify-between overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <Link
              to="/"
              className="text-xl font-bold uppercase text-gray-800"
              onClick={closeMobileMenu}
            >
              VELORISE
            </Link>
            <button onClick={closeMobileMenu} aria-label="Close Menu">
              <FiX size={24} />
            </button>
          </div>

          {/* ===== Links ===== */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="block text-lg font-medium"
            >
              Home
            </Link>
            <Link
              to="/new-arrivals"
              onClick={closeMobileMenu}
              className="block text-lg font-medium"
            >
              New Arrivals
            </Link>

            {/* ✅ Collections Accordion */}
            <div>
              <button
                className="w-full flex justify-between items-center text-lg font-medium"
                onClick={() => setMobileCollectionsOpen((v) => !v)}
              >
                Collections
                <FiChevronDown
                  className={`${
                    mobileCollectionsOpen ? "rotate-180" : ""
                  } transition-transform`}
                />
              </button>
              <div
                className={`pl-4 mt-2 space-y-1 overflow-hidden transition-all duration-300 ${
                  mobileCollectionsOpen ? "max-h-96" : "max-h-0"
                }`}
              >
                <Link
                  to="/products/men"
                  onClick={closeMobileMenu}
                  className="block py-1"
                >
                  Men
                </Link>
                <Link
                  to="/products/women"
                  onClick={closeMobileMenu}
                  className="block py-1"
                >
                  Women
                </Link>
                <Link
                  to="/products/kids"
                  onClick={closeMobileMenu}
                  className="block py-1"
                >
                  Kids
                </Link>
              </div>
            </div>

            {/* ✅ Our Product Accordion */}
            <div>
              <button
                className="w-full flex justify-between items-center text-lg font-medium"
                onClick={() => setMobileOurProductOpen((v) => !v)}
              >
                Our Product
                <FiChevronDown
                  className={`${
                    mobileOurProductOpen ? "rotate-180" : ""
                  } transition-transform`}
                />
              </button>
              <div
                className={`pl-4 mt-2 space-y-1 overflow-hidden transition-all duration-300 ${
                  mobileOurProductOpen ? "max-h-96" : "max-h-0"
                }`}
              >
                <Link
                  to="/our-product/clothing"
                  onClick={closeMobileMenu}
                  className="block py-1"
                >
                  Clothing
                </Link>
                <Link
                  to="/our-product/watches"
                  onClick={closeMobileMenu}
                  className="block py-1"
                >
                  Watches
                </Link>
                <Link
                  to="/our-product/perfume"
                  onClick={closeMobileMenu}
                  className="block py-1"
                >
                  Perfume
                </Link>
                <Link
                  to="/our-product/footwear"
                  onClick={closeMobileMenu}
                  className="block py-1"
                >
                  Footwear
                </Link>
                <Link
                  to="/our-product/handicraft"
                  onClick={closeMobileMenu}
                  className="block py-1"
                >
                  Handicraft
                </Link>
              </div>
            </div>

            <Link
              to="/sale"
              onClick={closeMobileMenu}
              className="block text-lg font-medium"
            >
              Sale
            </Link>
            <Link
              to="/top-selling"
              onClick={closeMobileMenu}
              className="block text-lg font-medium"
            >
              Top Selling
            </Link>
          </div>

          {/* ===== Bottom Icons ===== */}
          <div className="flex justify-around py-4 border-t">
            <Link
              to="/search"
              className="text-gray-700 hover:text-gray-900"
              onClick={closeMobileMenu}
            >
              <FiSearch size={24} />
            </Link>
            <Link
              to="/favourites"
              className="relative text-gray-700 hover:text-gray-900"
              onClick={closeMobileMenu}
            >
              <FiHeart size={24} />
              {likeCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-semibold w-4 h-4 flex items-center justify-center rounded-full">
                  {likeCount}
                </span>
              )}
            </Link>
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-gray-900"
              onClick={closeMobileMenu}
            >
              <FiShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-semibold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-gray-900">
              <FiUser size={24} />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
