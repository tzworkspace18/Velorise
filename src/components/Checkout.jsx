import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import products from "../data/products"; // ✅ Added to connect image data

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("visa");
  const [formData, setFormData] = useState({
    address: "",
    coupon: "",
  });
  const [addresses, setAddresses] = useState([]);
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [newAddress, setNewAddress] = useState("");

  useEffect(() => {
    const savedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
    setAddresses(savedAddresses);
    const defaultAddr = savedAddresses.find((a) => a.isDefault);
    if (defaultAddr) {
      setFormData((prev) => ({
        ...prev,
        address: `${defaultAddr.firstName} ${defaultAddr.lastName}, ${defaultAddr.address}, ${defaultAddr.city}, ${defaultAddr.state}, ${defaultAddr.postal}, ${defaultAddr.country}`,
      }));
    }
  }, []);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // ✅ Added Tax (5%) in calculation
  const shipping = subtotal > 3000 ? 0 : 99;
  const tax = Math.round(subtotal * 0.05);
  const discount = formData.coupon === "VELO20" ? subtotal * 0.2 : 0;
  const total = subtotal + shipping + tax - discount;

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddNewAddress = () => {
    if (!newAddress.trim()) {
      alert("Please enter a valid address.");
      return;
    }
    setFormData({ ...formData, address: newAddress });
    setShowNewAddress(false);
    setNewAddress("");
    alert("✅ New address added for this order!");
  };

  const handlePlaceOrder = () => {
    if (!formData.address) {
      alert("⚠️ Please select or add your delivery address.");
      return;
    }

    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Processing",
      total: `₹${total}`,
      items: cartItems.map((item) => {
        const fullProduct = products.find((p) => p.id === item.id);
        return {
          id: item.id,
          name: fullProduct?.name || item.name,
          qty: item.quantity,
          price: `₹${item.price}`,
          image:
            fullProduct?.images?.[0] ||
            item.image ||
            "https://via.placeholder.com/60",
        };
      }),
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedOrders = [newOrder, ...existingOrders];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    alert(`✅ Order Confirmed!\n\nOrder ID: ${newOrder.id}\nTotal Paid: ₹${total}`);

    clearCart();
    navigate("/profile");
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          {/* 🏠 Address Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Delivery Address
            </h2>

            {addresses.length > 0 ? (
              <div className="space-y-3">
                {addresses.map((addr, idx) => {
                  const formatted = `${addr.firstName} ${addr.lastName}, ${addr.address}, ${addr.city}, ${addr.state}, ${addr.postal}, ${addr.country}`;
                  return (
                    <label
                      key={idx}
                      className={`block border rounded-lg p-3 cursor-pointer transition-all ${
                        formData.address === formatted
                          ? "border-green-500 bg-green-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="address"
                        value={formatted}
                        checked={formData.address === formatted}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        className="mr-2 accent-green-600"
                      />
                      <span className="text-sm text-gray-700">{formatted}</span>
                      {addr.isDefault && (
                        <span className="ml-2 text-xs text-green-600 font-medium">
                          (Default)
                        </span>
                      )}
                    </label>
                  );
                })}

                {!showNewAddress && (
                  <button
                    onClick={() => setShowNewAddress(true)}
                    className="mt-3 text-sm text-green-600 font-medium hover:underline"
                  >
                    + Add another address
                  </button>
                )}

                {showNewAddress && (
                  <div className="mt-3 border-t pt-3">
                    <textarea
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                      placeholder="Enter new delivery address..."
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none text-sm"
                    />
                    <div className="flex justify-end mt-2 gap-2">
                      <button
                        onClick={() => setShowNewAddress(false)}
                        className="px-4 py-1.5 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddNewAddress}
                        className="px-4 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-xl">
                <p className="text-gray-600 mb-3 text-sm">
                  No address saved. Add an address to continue.
                </p>
                <textarea
                  name="address"
                  placeholder="Enter your delivery address..."
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg w-3/4 px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none text-sm"
                ></textarea>
              </div>
            )}
          </div>

          {/* 💳 Payment Methods */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Choose How to Pay
            </h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { value: "visa", label: "Visa **** 0912" },
                { value: "mastercard", label: "MasterCard **** 7810" },
                { value: "upi", label: "Pay with UPI / Wallet" },
              ].map((method) => (
                <label
                  key={method.value}
                  className={`flex flex-col border rounded-lg p-4 cursor-pointer transition-all ${
                    paymentMethod === method.value
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method.value}
                    checked={paymentMethod === method.value}
                    onChange={() => setPaymentMethod(method.value)}
                    className="hidden"
                  />
                  <span className="font-medium text-gray-800 text-sm">
                    {method.label}
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    Secure payment via {method.value.toUpperCase()}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* 🛒 Cart Items */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Cart</h2>
              {cartItems.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove All
                </button>
              )}
            </div>

            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center py-4 text-sm">
                Your cart is empty.
              </p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-t border-gray-100 py-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900 text-sm">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-fit sticky top-8 space-y-6">
          

          {/* 🧾 Summary */}
          <div className="border-t pt-4 text-sm text-gray-700 space-y-2">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>₹{subtotal}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping</p>
              <p>{shipping === 0 ? "Free" : `₹${shipping}`}</p>
            </div>

            {/* ✅ Added Tax Row */}
            <div className="flex justify-between">
              <p>Tax (5%)</p>
              <p>₹{tax}</p>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <p>Discount</p>
                <p>−₹{discount}</p>
              </div>
            )}
            <div className="border-t pt-3 flex justify-between text-base font-semibold text-gray-900">
              <p>Total</p>
              <p>₹{total}</p>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all text-center"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
