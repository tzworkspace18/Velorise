import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

  const handleIncrease = (id) => updateQuantity(id, getQty(id) + 1);
  const handleDecrease = (id) => updateQuantity(id, getQty(id) - 1);

  const getQty = (id) => {
    const item = cartItems.find((i) => i.id === id);
    return item ? item.quantity : 1;
  };

  const total = totalPrice;
  const shipping = cartItems.length > 0 ? 100 : 0;
  const tax = Math.round(total * 0.05);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 md:px-12 lg:px-20">
      {/* ✅ Use grid for sticky positioning to work */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        {/* 🛒 Cart Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-3 mb-5">
            <h2 className="text-xl font-semibold text-gray-800">My Shopping Bag</h2>
            <span className="text-sm text-gray-500">{cartItems.length} Items</span>
          </div>

          {/* Column Headers (Desktop Only) */}
          <div className="hidden md:grid grid-cols-[1.5fr_1fr_1fr_1fr] text-sm font-semibold text-gray-600 pb-3 border-b">
            <span className="text-left">Product Details</span>
            <span className="text-center">Price</span>
            <span className="text-center">Quantity</span>
            <span className="text-center">Total</span>
          </div>

          {/* Product List */}
          <div className="divide-y">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="py-6 grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] items-center gap-4 md:gap-0"
              >
                {/* Product Info */}
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
                    <p className="text-xs text-gray-600">
                      Color:{" "}
                      <span className="font-medium text-gray-800">Green-D</span>
                    </p>
                    <p className="text-xs text-gray-600">
                      Size:{" "}
                      <span className="font-medium text-gray-800">
                        {item.size || "XL"}
                      </span>
                    </p>
                    <p className="text-xs text-gray-600 flex items-center">
                      <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                      In Stock (12 Pcs)
                    </p>
                  </div>
                </div>

                {/* Price */}
                <p className="hidden md:flex justify-center text-gray-800 font-medium">
                  ₹{item.price}
                </p>

                {/* Quantity */}
                <div className="hidden md:flex justify-center items-center">
                  <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                    <button
                      onClick={() => handleDecrease(item.id)}
                      className="px-3 py-1 text-gray-700 font-bold hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="px-3 text-gray-800 font-medium text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleIncrease(item.id)}
                      className="px-3 py-1 text-gray-700 font-bold hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total & Delete */}
                <div className="hidden md:flex justify-center items-center gap-4">
                  <p className="font-semibold text-gray-900">
                    ₹{item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaTrashAlt size={16} />
                  </button>
                </div>

                {/* ✅ Mobile Bottom Section */}
                <div className="flex md:hidden justify-between items-center pt-3">
                  {/* Delete Icon (Left) */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-600 flex items-center gap-1 text-xs"
                  >
                    <FaTrashAlt size={14} />
                    Remove
                  </button>

                  {/* Quantity Bar (Center) */}
                  <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                    <button
                      onClick={() => handleDecrease(item.id)}
                      className="px-3 py-1 text-gray-700 font-bold hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="px-3 text-gray-800 font-medium text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleIncrease(item.id)}
                      className="px-3 py-1 text-gray-700 font-bold hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  {/* Price (Right) */}
                  <p className="text-gray-900 font-semibold text-sm">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Expected Delivery */}
          {cartItems.length > 0 && (
            <div className="mt-4 text-sm text-gray-600 font-medium">
              Expected Delivery:{" "}
              <span className="text-gray-800 font-semibold">Friday</span>
            </div>
          )}
        </div>

        {/* ✅ Sticky Order Summary (Now Works!) */}
        <div className="h-fit">
          <div className="sticky top-6 bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Order Summary
            </h2>

            <div className="flex justify-between mb-2 text-gray-600">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between mb-2 text-gray-600">
              <span>Shipping</span>
              <span>₹{shipping}</span>
            </div>
            <div className="flex justify-between mb-2 text-gray-600">
              <span>Tax (5%)</span>
              <span>₹{tax}</span>
            </div>

            <div className="border-t mt-4 pt-4 flex justify-between text-lg font-semibold text-gray-900">
              <span>Total</span>
              <span>₹{total + shipping + tax}</span>
            </div>

            <button className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-all text-center">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
