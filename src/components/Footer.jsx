import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/brand-logo.png";

import {
  FaXTwitter,
  FaDiscord,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      {/* 🌐 Main Footer */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 py-12 grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Left Section */}
        <div className="md:col-span-2">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-3">
            <img
  src={logo}
  alt="Velorise Logo"
  className="w-8 h-8 object-contain"
/>

            <h3 className="text-gray-900 text-lg font-semibold">Velorise</h3>
          </div>


          {/* Description */}
          <p className="text-sm text-gray-600 mb-5 leading-relaxed">
            Your one-stop destination for modern fashion, accessories, and lifestyle trends.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mb-6">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaXTwitter className="text-gray-600 hover:text-gray-900 cursor-pointer text-lg" />
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
            >
              <FaDiscord className="text-gray-600 hover:text-gray-900 cursor-pointer text-lg" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="text-gray-600 hover:text-gray-900 cursor-pointer text-lg" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram className="text-gray-600 hover:text-gray-900 cursor-pointer text-lg" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube className="text-gray-600 hover:text-gray-900 cursor-pointer text-lg" />
            </a>
          </div>

          {/* System Status */}
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 text-xs px-3 py-1.5 rounded-full font-medium">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
            All systems operational
          </div>
        </div>

        {/* Right Section Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 md:col-span-3 gap-6">
          {/* Product */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/new-arrivals">New Arrivals</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/collections">Collections</Link></li>
              <li><Link to="/offers">Special Offers</Link></li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/affiliate">Affiliate Program</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/partners">Partnerships</Link></li>
              <li><Link to="/press">Press Kit</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/shipping">Shipping Info</Link></li>
              <li><Link to="/returns">Returns & Refunds</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* ⚖️ Bottom Legal Bar */}
      <div className="border-t border-gray-200 py-5">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Velorise — All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-gray-800">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-gray-800">
              Terms
            </Link>
            <Link to="/code-of-conduct" className="hover:text-gray-800">
              Code of Conduct
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
