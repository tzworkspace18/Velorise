import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    updateSize,
    totalPrice,
  } = useCart();

  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");

  const handleIncrease = (id, size) => {
    const item = cartItems.find((i) => i.id === id && i.size === size);
    updateQuantity(id, size, item.quantity + 1);
  };

  const handleDecrease = (id, size) => {
    const item = cartItems.find((i) => i.id === id && i.size === size);
    if (item.quantity > 1) updateQuantity(id, size, item.quantity - 1);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/checkout");
  };

  // ✅ Unified Order Summary (same as Checkout)
  const shipping = totalPrice > 3000 ? 0 : 99;
  const tax = Math.round(totalPrice * 0.05);
  const discount = coupon === "VELO20" ? totalPrice * 0.2 : 0;
  const finalTotal = totalPrice + shipping + tax - discount;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center border-b pb-3 mb-5">
            <h2 className="text-xl font-semibold text-gray-800">My Shopping Bag</h2>
            <span className="text-sm text-gray-500">{cartItems.length} Items</span>
          </div>

          {/* Headers */}
          <div className="hidden md:grid grid-cols-[1.5fr_1fr_1fr_1fr] text-sm font-semibold text-gray-600 pb-3 border-b">
            <span className="text-left">Product Details</span>
            <span className="text-center">Price</span>
            <span className="text-center">Quantity</span>
            <span className="text-center">Total</span>
          </div>

          {/* Cart Items */}
          <div className="divide-y">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="py-6 grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] items-center gap-4 md:gap-0"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 rounded-md object-cover border border-gray-200"
                  />
                  <div className="flex flex-col space-y-1">
                    <h3
                      className="text-gray-900 font-semibold text-sm md:text-base truncate"
                      title={item.name}
                    >
                      {item.name}
                    </h3>

                    {/* ✅ Size Dropdown */}
                    <div className="flex items-center text-xs text-gray-600 mt-1">
                      <span className="mr-1">Size:</span>
                      <select
                        value={item.size || "Select"}
                        onChange={(e) =>
                          updateSize(item.id, item.size, e.target.value)
                        }
                        className="border border-gray-300 rounded-md px-2 py-[2px] text-xs text-gray-800 focus:ring-1 focus:ring-gray-400 outline-none"
                      >
                        <option disabled value="Select">
                          Select Size
                        </option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                      </select>
                    </div>

                    <p className="text-xs text-gray-600">₹{item.price}</p>
                  </div>
                </div>

                {/* Price */}
                <p className="hidden md:flex justify-center text-gray-800 font-medium">
                  ₹{item.price}
                </p>

                {/* Quantity Controls */}
                <div className="hidden md:flex justify-center items-center">
                  <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                    <button
                      onClick={() => handleDecrease(item.id, item.size)}
                      className="px-3 py-1 text-gray-700 font-bold hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="px-3 text-gray-800 font-medium text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleIncrease(item.id, item.size)}
                      className="px-3 py-1 text-gray-700 font-bold hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total + Remove */}
                <div className="hidden md:flex justify-center items-center gap-4">
                  <p className="font-semibold text-gray-900">
                    ₹{item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaTrashAlt size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Order Summary */}
        <div className="h-fit">
          <div className="sticky top-6 bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Order Summary
            </h2>

            <div className="flex justify-between mb-2 text-gray-600">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between mb-2 text-gray-600">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
            </div>
            <div className="flex justify-between mb-2 text-gray-600">
              <span>Tax (5%)</span>
              <span>₹{tax}</span>
            </div>

            {/* ✅ Coupon Input */}
            <div className="mt-4 mb-3">
              <label className="block text-sm text-gray-600 mb-1">
                Discount Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                  placeholder="Enter code (e.g. VELO20)"
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none text-sm"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (coupon === "VELO20") {
                      localStorage.setItem("appliedCoupon", "VELO20"); // ✅ Save to localStorage
                      alert("✅ Coupon applied!");
                    } else {
                      localStorage.removeItem("appliedCoupon");
                      alert("❌ Invalid code!");
                    }
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm"
                >
                  Apply
                </button>
              </div>
              {coupon === "VELO20" && (
                <p className="text-green-600 text-xs mt-1">
                  ✅ Coupon code applied successfully!
                </p>
              )}
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-sm text-green-600 mb-2">
                <span>Discount (20%)</span>
                <span>-₹{discount}</span>
              </div>
            )}

            <div className="border-t mt-4 pt-4 flex justify-between text-lg font-semibold text-gray-900">
              <span>Total</span>
              <span>₹{finalTotal}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-all text-center"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
