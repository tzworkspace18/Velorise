import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";

// 📄 Pages
import Home from "./pages/Home";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage"; // ✅ Corrected path

// 🛒 Cart Context Provider
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <ScrollToTop />
      <Navbar />

      {/* ✅ Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>

      <Footer />
    </CartProvider>
  );
}

export default App;
