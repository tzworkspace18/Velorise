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

const Navbar = () => {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [ourProductOpen, setOurProductOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);
  const [mobileOurProductOpen, setMobileOurProductOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
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
      {/* Desktop Navbar */}
      <div className="hidden md:flex container mx-auto px-14 py-8 items-center justify-between">
        <Link to="/" className="text-3xl font-bold uppercase text-gray-800">
          VELORISE
        </Link>

        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-gray-600">Home</Link>
          <Link to="/new-arrivals" className="hover:text-gray-600">New Arrivals</Link>

          {/* Collections Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setCollectionsOpen(true)}
            onMouseLeave={() => setCollectionsOpen(false)}
          >
            <button className="flex items-center hover:text-gray-600">
              Collections <FiChevronDown className="ml-1 text-gray-700" />
            </button>
            {collectionsOpen && (
              <div className="absolute top-full left-0 bg-white border rounded mt-2 py-2 w-48 z-50">
                <Link to="/collections/mens" className="block px-4 py-1 hover:bg-gray-100">Mens</Link>
                <Link to="/collections/womens" className="block px-4 py-1 hover:bg-gray-100">Womens</Link>
                <Link to="/collections/kids" className="block px-4 py-1 hover:bg-gray-100">Kids</Link>
                <Link to="/collections/couples" className="block px-4 py-1 hover:bg-gray-100">Couples</Link>
                <Link to="/collections/wedding" className="block px-4 py-1 hover:bg-gray-100">Wedding</Link>
                <Link to="/collections/navaratri-special" className="block px-4 py-1 hover:bg-gray-100">Navaratri Special</Link>
              </div>
            )}
          </div>

          <Link to="/sale" className="hover:text-gray-600">Sale</Link>
          <Link to="/top-selling" className="hover:text-gray-600">TopSelling</Link>

          {/* Our Product Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOurProductOpen(true)}
            onMouseLeave={() => setOurProductOpen(false)}
          >
            <button className="flex items-center hover:text-gray-600">
              OurProduct <FiChevronDown className="ml-1 text-gray-700" />
            </button>
            {ourProductOpen && (
              <div className="absolute top-full left-0 bg-white border rounded mt-2 py-2 w-48 z-50">
                <Link to="/our-product/clothing" className="block px-4 py-1 hover:bg-gray-100">Clothing</Link>
                <Link to="/our-product/watches" className="block px-4 py-1 hover:bg-gray-100">Watches</Link>
                <Link to="/our-product/perfume" className="block px-4 py-1 hover:bg-gray-100">Perfume</Link>
                <Link to="/our-product/footwear" className="block px-4 py-1 hover:bg-gray-100">Footwear</Link>
                <Link to="/our-product/handicraft" className="block px-4 py-1 hover:bg-gray-100">HandiCraft</Link>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Icons */}
        <div className="flex items-center space-x-6">
          <Link to="/search" className="text-gray-700 hover:text-gray-900">
            <FiSearch size={24} />
          </Link>
          <Link to="/wishlist" className="text-gray-700 hover:text-gray-900">
            <FiHeart size={24} />
          </Link>
          <Link to="/cart" className="relative text-gray-700 hover:text-gray-900">
            <FiShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/account" className="text-gray-700 hover:text-gray-900">
            <FiUser size={24} />
          </Link>
        </div>
      </div>

      {/* ✅ Mobile Header (Only Cart + Menu) */}
      <div className="flex md:hidden items-center justify-between px-4 py-3 border-b">
        <Link to="/" className="text-xl font-bold uppercase text-gray-800">
          VELORISE
        </Link>
        <div className="flex items-center space-x-4">
          {/* 🛒 Cart Icon with Badge */}
          <Link to="/cart" className="relative text-gray-700 hover:text-gray-900">
            <FiShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-semibold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          {/* ☰ Menu Toggle */}
          <button onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* ✅ Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col justify-between overflow-y-auto">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <Link to="/" className="text-xl font-bold uppercase text-gray-800" onClick={closeMobileMenu}>
              VELORISE
            </Link>
            <button onClick={closeMobileMenu}>
              <FiX size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
            <Link to="/" onClick={closeMobileMenu} className="block text-lg font-medium">Home</Link>
            <Link to="/new-arrivals" onClick={closeMobileMenu} className="block text-lg font-medium">New Arrivals</Link>

            {/* Collections */}
            <div>
              <button
                className="w-full flex justify-between items-center text-lg font-medium"
                onClick={() => setMobileCollectionsOpen(!mobileCollectionsOpen)}
              >
                Collections <FiChevronDown className={`${mobileCollectionsOpen ? "rotate-180" : ""} transition-transform`} />
              </button>
              <div className={`pl-4 mt-2 space-y-1 overflow-hidden transition-all duration-300 ${mobileCollectionsOpen ? "max-h-96" : "max-h-0"}`}>
                <Link to="/collections/mens" onClick={closeMobileMenu} className="block py-1">Mens</Link>
                <Link to="/collections/womens" onClick={closeMobileMenu} className="block py-1">Womens</Link>
                <Link to="/collections/kids" onClick={closeMobileMenu} className="block py-1">Kids</Link>
                <Link to="/collections/couples" onClick={closeMobileMenu} className="block py-1">Couples</Link>
                <Link to="/collections/wedding" onClick={closeMobileMenu} className="block py-1">Wedding</Link>
                <Link to="/collections/navaratri-special" onClick={closeMobileMenu} className="block py-1">Navaratri Special</Link>
              </div>
            </div>

            <Link to="/sale" onClick={closeMobileMenu} className="block text-lg font-medium">Sale</Link>
            <Link to="/top-selling" onClick={closeMobileMenu} className="block text-lg font-medium">TopSelling</Link>

            {/* Our Product */}
            <div>
              <button
                className="w-full flex justify-between items-center text-lg font-medium"
                onClick={() => setMobileOurProductOpen(!mobileOurProductOpen)}
              >
                OurProduct <FiChevronDown className={`${mobileOurProductOpen ? "rotate-180" : ""} transition-transform`} />
              </button>
              <div className={`pl-4 mt-2 space-y-1 overflow-hidden transition-all duration-300 ${mobileOurProductOpen ? "max-h-96" : "max-h-0"}`}>
                <Link to="/our-product/clothing" onClick={closeMobileMenu} className="block py-1">Clothing</Link>
                <Link to="/our-product/watches" onClick={closeMobileMenu} className="block py-1">Watches</Link>
                <Link to="/our-product/perfume" onClick={closeMobileMenu} className="block py-1">Perfume</Link>
                <Link to="/our-product/footwear" onClick={closeMobileMenu} className="block py-1">Footwear</Link>
                <Link to="/our-product/handicraft" onClick={closeMobileMenu} className="block py-1">HandiCraft</Link>
              </div>
            </div>
          </div>

          {/* ✅ Bottom Icon Bar */}
          <div className="flex justify-around py-4 border-t">
            <Link to="/search" className="text-gray-700 hover:text-gray-900">
              <FiSearch size={24} />
            </Link>
            <Link to="/wishlist" className="text-gray-700 hover:text-gray-900">
              <FiHeart size={24} />
            </Link>
            <Link to="/cart" className="relative text-gray-700 hover:text-gray-900">
              <FiShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-semibold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/account" className="text-gray-700 hover:text-gray-900">
              <FiUser size={24} />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
