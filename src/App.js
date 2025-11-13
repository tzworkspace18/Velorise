import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import FavouritesPage from "./pages/FavouritesPage";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import Profile from "./components/Profile";
import NewArrivals from "./pages/NewArrivals";
import SalePage from "./pages/SalePage";
import TopSelling from "./pages/TopSelling";

import { CartProvider } from "./context/CartContext";
import { LikeProvider } from "./context/LikeContext";

function App() {
  return (
    <CartProvider>
      <LikeProvider>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Product Pages */}
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/:category" element={<ProductPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/sale" element={<SalePage />} />
          <Route path="/top-selling" element={<TopSelling />} />

          {/* Other Pages */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/favourites" element={<FavouritesPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </LikeProvider>
    </CartProvider>
  );
}

export default App;
