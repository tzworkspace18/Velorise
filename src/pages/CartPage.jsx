import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    totalPrice,
  } = useCart();

  const navigate = useNavigate();
  const [coupon] = useState("");

  const handleIncrease = (id, size, color) => {
    const item = cartItems.find((i) => i.id === id && i.size === size && i.color === color);
    updateQuantity(id, size, color, item.quantity + 1);
  };

  const handleDecrease = (id, size, color) => {
    const item = cartItems.find((i) => i.id === id && i.size === size && i.color === color);
    if (item.quantity > 1) updateQuantity(id, size, color, item.quantity - 1);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/checkout");
  };

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

          {/* Cart Items */}
          <div className="divide-y">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.size}-${item.color}`}
                className="relative py-6 grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] items-center gap-4 md:gap-0"
              >
                {/* Product Section */}
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
                    <p className="text-xs text-gray-600">Size: {item.size}</p>
                    <p className="text-xs text-gray-600">Color: {item.color}</p>
                    <p className="text-xs text-gray-600">₹{item.price}</p>
                  </div>
                </div>

                {/* Desktop View (Price & Qty & Total) */}
                <p className="hidden md:flex justify-center text-gray-800 font-medium">
                  ₹{item.price}
                </p>

                <div className="hidden md:flex justify-center items-center">
                  <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                    <button
                      onClick={() => handleDecrease(item.id, item.size, item.color)}
                      className="px-3 py-1 text-gray-700 font-bold hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="px-3 text-gray-800 font-medium text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleIncrease(item.id, item.size, item.color)}
                      className="px-3 py-1 text-gray-700 font-bold hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="hidden md:flex justify-center items-center gap-4">
                  <p className="font-semibold text-gray-900">
                    ₹{item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id, item.size, item.color)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaTrashAlt size={16} />
                  </button>
                </div>

                {/* ✅ Mobile View — Add Remove Icon at Bottom Right Corner */}
                <button
                  onClick={() => removeFromCart(item.id, item.size, item.color)}
                  className="absolute bottom-2 right-2 text-red-500 hover:text-red-600 md:hidden"
                >
                  <FaTrashAlt size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
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
