import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FiHeart,
    FiHeadphones,
    FiSave,
    FiUser,
    FiTrash2,
    FiPlus,
    FiEye,
} from "react-icons/fi";

/* Toast component (unchanged design) */
const Toast = ({ message, type = "success", onClose }) => {
    const color =
        type === "success" ? "bg-green-600" : type === "error" ? "bg-red-600" : "bg-gray-600";
    useEffect(() => {
        const t = setTimeout(onClose, 3000);
        return () => clearTimeout(t);
    }, [onClose]);
    return (
        <div className={`fixed bottom-6 right-6 ${color} text-white px-4 py-2 rounded shadow-lg z-50`}>
            {message}
        </div>
    );
};

const emptyAddress = () => ({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "India",
    state: "",
    city: "",
    postal: "",
    address: "",
    isDefault: false,
});

const Profile = () => {
    const [user, setUser] = useState(null);
    const [profileForm, setProfileForm] = useState({ name: "", mobile: "" });
    const [addresses, setAddresses] = useState([]);
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [formAddr, setFormAddr] = useState(emptyAddress());
    const [editingIndex, setEditingIndex] = useState(null);
    const [confirmModal, setConfirmModal] = useState({ show: false, index: null });
    const [toast, setToast] = useState(null);

    const navigate = useNavigate();

    /* load user + addresses */
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const storedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
        if (!storedUser) {
            navigate("/login");
            return;
        }
        setUser(storedUser);
        setProfileForm({
            name: storedUser.name || "User Name",
            email: storedUser.mobile || "user@example.com",
        });
        setAddresses(storedAddresses);

        // ✅ Load orders dynamically from localStorage
        const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];

        // If you still want your demo/sample orders to show initially:
        const sampleOrders = [
            {
                id: "ORD-2025-001",
                date: "05-Nov-2025",
                status: "Delivered",
                total: "₹2,499",
                items: [
                    { name: "Cotton Shirt", qty: 1, price: "₹999" },
                    { name: "Slim Fit Jeans", qty: 1, price: "₹1,500" },
                ],
            },
            {
                id: "ORD-2025-002",
                date: "02-Nov-2025",
                status: "Shipped",
                total: "₹1,299",
                items: [{ name: "Women’s Kurti", qty: 1, price: "₹1,299" }],
            },
        ];

        // Combine both (new placed orders first, then samples)
        setOrders([...storedOrders, ...sampleOrders]);

    }, [navigate]);

    /* Persist addresses whenever they change (extra safety) */
    useEffect(() => {
        localStorage.setItem("addresses", JSON.stringify(addresses));
    }, [addresses]);

    const showToast = (message, type = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    /* ---------- Profile (Edit) ---------- */
    const saveProfile = () => {
        if (!profileForm.name.trim() || !profileForm.mobile.trim()) {
            showToast("Please fill all profile fields", "error");
            return;
        }
        const updatedUser = { ...user, name: profileForm.name, mobile: profileForm.mobile };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setProfileForm({ name: updatedUser.name, mobile: updatedUser.mobile });
        setShowEditProfile(false);
        showToast("Profile updated successfully");
    };

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    /* ---------- Address Utilities ---------- */
    const validateAddress = (addr) => {
        if (!addr.firstName.trim() || !addr.address.trim() || !addr.city.trim()) {
            showToast("Please fill all required address fields", "error");
            return false;
        }
        return true;
    };

    /* Add address — functional update to avoid stale reads */
    const addAddress = () => {
        if (!validateAddress(formAddr)) return;

        setAddresses((prev) => {
            // if first address, ensure it becomes default
            const hasDefault = prev.some((a) => a.isDefault);
            const toAdd = { ...formAddr, isDefault: hasDefault ? !!formAddr.isDefault : true };
            const updated = [...prev, toAdd];
            // localStorage handled by effect
            return updated;
        });

        // reset form + close modal
        setFormAddr(emptyAddress());
        setShowAddressModal(false);
        showToast("Address added successfully");
    };

    /* Open Add modal (clear state) */
    const openAddAddress = () => {
        setEditingIndex(null);
        setFormAddr(emptyAddress());
        setShowAddressModal(true);
    };

    /* Open Edit modal (guard index) */
    const openEditAddress = (index) => {
        if (typeof addresses[index] === "undefined") {
            showToast("Address not found", "error");
            return;
        }
        setEditingIndex(index);
        // clone to avoid accidental mutation
        setFormAddr({ ...addresses[index] });
        setShowAddressModal(true);
    };

    /* Save edited address — functional update */
    const saveEditedAddress = () => {
        if (!validateAddress(formAddr)) return;

        setAddresses((prev) => {
            const idx = editingIndex;
            if (idx === null || idx === undefined || idx < 0 || idx >= prev.length) {
                showToast("Invalid address index", "error");
                return prev;
            }
            const updated = [...prev];
            updated[idx] = { ...formAddr };
            // if new default, clear others
            if (formAddr.isDefault) {
                updated.forEach((a, i) => {
                    if (i !== idx) a.isDefault = false;
                });
            }
            return updated;
        });

        setEditingIndex(null);
        setFormAddr(emptyAddress());
        setShowAddressModal(false);
        showToast("Address updated successfully");
    };

    /* Set default address (functional update) */
    const setDefaultAddress = (index) => {
        setAddresses((prev) => {
            if (index === null || index === undefined || index < 0 || index >= prev.length) return prev;
            return prev.map((a, i) => ({ ...a, isDefault: i === index }));
        });
        showToast("Default address updated");
    };

    /* Delete flow — functional update and defensive checks */
    const handleDeleteClick = (index) => setConfirmModal({ show: true, index });

    const confirmDelete = (passedIndex) => {
        // allow optional index param for safety, fallback to state
        const indexToDelete = typeof passedIndex === "number" ? passedIndex : confirmModal.index;
        if (indexToDelete === null || indexToDelete === undefined) {
            setConfirmModal({ show: false, index: null });
            return;
        }

        setAddresses((prev) => {
            if (indexToDelete < 0 || indexToDelete >= prev.length) return prev;
            const updated = prev.filter((_, i) => i !== indexToDelete);
            // if no default remains, and items exist, make first default
            if (updated.length > 0 && !updated.some((a) => a.isDefault)) {
                updated[0] = { ...updated[0], isDefault: true };
            }
            return updated;
        });

        setConfirmModal({ show: false, index: null });
        showToast("Address deleted");
    };

    const cancelDelete = () => setConfirmModal({ show: false, index: null });

    const closeAddressModal = () => {
        setEditingIndex(null);
        setShowAddressModal(false);
        setFormAddr(emptyAddress());
    };

    /* ---------- Orders ---------- */
    const viewOrderDetails = (order) => {
        setSelectedOrder(order);
        setShowOrderModal(true);
    };

    // ✅ Cancel Order Function
    const cancelOrder = (orderId) => {
        if (window.confirm("Are you sure you want to cancel this order?")) {
            setOrders((prev) => {
                const updatedOrders = prev.map((order) =>
                    order.id === orderId ? { ...order, status: "Cancelled" } : order
                );
                localStorage.setItem("orders", JSON.stringify(updatedOrders));
                showToast("Order cancelled successfully", "success");
                return updatedOrders;
            });
        }
    };


    /* close order modal */
    const closeOrderModal = () => {
        setSelectedOrder(null);
        setShowOrderModal(false);
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
            <div className="w-full max-w-6xl">
                {/* Profile Header */}
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">

                    <div className="p-6 md:flex md:items-center md:gap-6 bg-gradient-to-b from-[#faecd7] via-white to-[#faecd7]">
                        <div className="flex-shrink-0 -mt-16 md:mt-0 md:-ml-2">
                            <div className="w-28 h-28 rounded-full bg-gradient-to-b from-[#b18e5a] via-[#faecd7] to-[#b18e5a] flex items-center justify-center border-4 border-white shadow">
                                <FiUser className="text-gray-700 text-4xl" />
                            </div>
                        </div>

                        <div className="mt-3 md:mt-0 md:flex-1">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h1 className="text-2xl font-semibold text-gray-800">{profileForm.name}</h1>
                                    <p className="text-gray-500 mt-1">{profileForm.mobile}</p>
                                </div>

                                <div className="flex flex-wrap sm:flex-nowrap gap-3 justify-end items-center">
                                    <button
                                        onClick={() => setShowEditProfile(true)}
                                        className="px-4 py-2 bg-white border rounded-md shadow-sm hover:bg-gray-50 text-sm whitespace-nowrap"
                                    >
                                        Edit Profile
                                    </button>
                                    <button
                                        onClick={logout}
                                        className="px-4 py-2 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700 text-sm whitespace-nowrap"
                                    >
                                        Logout
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Orders */}
                <div className="mt-6 bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800">My Orders</h2>

                    {orders.length === 0 ? (
                        <p className="text-gray-500 text-center">No orders yet.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-gray-700 border-collapse">
                                <thead className="bg-gray-100 text-gray-700 font-medium">
                                    <tr>
                                        <th className="px-6 py-3 text-left whitespace-nowrap">Order ID</th>
                                        <th className="px-6 py-3 text-left whitespace-nowrap">Date</th>
                                        <th className="px-6 py-3 text-left whitespace-nowrap">Status</th>
                                        <th className="px-6 py-3 text-left whitespace-nowrap">Total</th>
                                        <th className="px-6 py-3 text-right whitespace-nowrap">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {orders.map((o, i) => (
                                        <tr
                                            key={i}
                                            className="border-b hover:bg-gray-50 transition-colors duration-200"
                                        >
                                            <td className="px-6 py-3 align-middle font-medium">{o.id}</td>
                                            <td className="px-6 py-3 align-middle">{o.date}</td>
                                            <td className="px-6 py-3 align-middle">
                                                <span
                                                    className={`inline-block px-2 py-1 rounded text-xs font-medium ${o.status === "Delivered"
                                                            ? "bg-green-100 text-green-700"
                                                            : o.status === "Shipped"
                                                                ? "bg-yellow-100 text-yellow-700"
                                                                : o.status === "Cancelled"
                                                                    ? "bg-red-100 text-red-700"
                                                                    : "bg-gray-100 text-gray-700"
                                                        }`}
                                                >
                                                    {o.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-3 align-middle">{o.total}</td>

                                            {/* ✅ Updated Action Column */}
                                            <td className="px-6 py-3 text-right align-middle flex justify-end gap-3">
                                                <button
                                                    onClick={() => viewOrderDetails(o)}
                                                    className="text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 transition-colors duration-200"
                                                >
                                                    <FiEye className="text-sm" /> View
                                                </button>

                                                {/* ✅ Show Cancel button only if not Cancelled or Delivered */}
                                                {o.status !== "Cancelled" && o.status !== "Delivered" && (
                                                    <button
                                                        onClick={() => cancelOrder(o.id)}
                                                        className="text-red-600 hover:text-red-800 inline-flex items-center gap-1 transition-colors duration-200"
                                                    >
                                                        <FiTrash2 className="text-sm" />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>



                {/* ✅ Order Details Modal */}
                {showOrderModal && selectedOrder && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                            onClick={closeOrderModal}
                        />
                        <div
                            className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                                Order Details
                            </h3>
                            <p className="text-sm text-gray-600 mb-1">
                                <strong>Order ID:</strong> {selectedOrder.id}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                                <strong>Date:</strong> {selectedOrder.date}
                            </p>
                            <p className="text-sm text-gray-600 mb-3">
                                <strong>Status:</strong> {selectedOrder.status}
                            </p>

                            <div className="border-t pt-3">
                                <h4 className="font-medium text-gray-800 mb-2">Items:</h4>

                                {/* ✅ Show product image, name, qty, price */}
                                {selectedOrder.items.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex justify-between items-center text-sm text-gray-700 mb-3"
                                    >
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={item.image || "https://via.placeholder.com/60"}
                                                alt={item.name}
                                                className="w-12 h-12 object-cover rounded-md border"
                                            />
                                            <div>
                                                <p className="font-medium text-gray-800">{item.name}</p>
                                                <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                                            </div>
                                        </div>
                                        <p className="font-semibold text-gray-800">{item.price}</p>
                                    </div>
                                ))}

                                <div className="border-t mt-3 pt-2 flex justify-between text-sm font-medium text-gray-800">
                                    <span>Total:</span>
                                    <span>{selectedOrder.total}</span>
                                </div>
                            </div>

                            <div className="flex justify-end mt-5">
                                <button
                                    onClick={closeOrderModal}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}



                {/* Wishlist + Addresses + Support */}
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Wishlist */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-lg font-semibold mb-3 text-gray-800">My Wishlist</h2>
                        <p className="text-gray-600 text-sm mb-4">Manage your saved favourites.</p>
                        <button onClick={() => navigate("/favourites")} className="px-4 py-2 bg-[#faecd7] text-black rounded-md shadow hover:bg-green-700 flex items-center gap-2">
                            <FiHeart /> Go to Favourites
                        </button>
                    </div>

                    {/* Addresses */}
                    <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-semibold text-gray-800">Shipping Addresses</h2>
                            <button onClick={openAddAddress} className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#faecd7] text-black rounded-md text-sm hover:bg-green-700">
                                <FiPlus /> Add
                            </button>
                        </div>

                        {addresses.length === 0 ? (
                            <p className="text-gray-500 text-sm">No addresses saved.</p>
                        ) : (
                            <div className="space-y-3 max-h-64 overflow-auto">
                                {addresses.map((addr, i) => (
                                    <div key={i} className={`border rounded-lg p-3 ${addr.isDefault ? "ring-2 ring-indigo-200" : ""}`}>
                                        <div className="flex justify-between">
                                            <p className="font-medium text-gray-800 text-sm">{addr.firstName} {addr.lastName}</p>
                                            {addr.isDefault && <span className="text-xs text-indigo-600 font-medium">Default</span>}
                                        </div>
                                        <p className="text-xs text-gray-600 mt-1">{addr.address}, {addr.city}, {addr.state}, {addr.postal}, {addr.country}</p>
                                        <div className="flex gap-2 mt-2">
                                            {!addr.isDefault && (
                                                <button onClick={() => setDefaultAddress(i)} className="text-yellow-600 text-xs hover:underline">Set Default</button>
                                            )}
                                            <button onClick={() => openEditAddress(i)} className="text-indigo-600 text-xs hover:underline">Edit</button>
                                            <button onClick={() => handleDeleteClick(i)} className="text-red-600 text-xs hover:underline">Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Support */}
                <div className="mt-6 bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-lg font-semibold mb-3 text-gray-800">Help & Support</h2>
                    <p className="text-gray-600 text-sm mb-4">Need help with orders or payments? Contact our support team.</p>
                    <button onClick={() => alert("Support request sent!")} className="px-4 py-2 bg-[#faecd7] text-black rounded-md shadow hover:bg-green-700 flex items-center gap-2">
                        <FiHeadphones /> Contact Support
                    </button>
                </div>
            </div>

            {/* Address Modal (Add / Edit) */}
            {showAddressModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40" onClick={closeAddressModal} />
                    {/* stopPropagation so clicks inside modal don't trigger backdrop close */}
                    <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">{editingIndex !== null ? "Edit Address" : "Add Address"}</h3>
                        <div className="space-y-3">
                            <input type="text" placeholder="First Name" value={formAddr.firstName} onChange={(e) => setFormAddr({ ...formAddr, firstName: e.target.value })} className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" />
                            <input type="text" placeholder="Last Name" value={formAddr.lastName} onChange={(e) => setFormAddr({ ...formAddr, lastName: e.target.value })} className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" />
                            <input type="text" placeholder="City" value={formAddr.city} onChange={(e) => setFormAddr({ ...formAddr, city: e.target.value })} className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" />
                            <input type="text" placeholder="State" value={formAddr.state} onChange={(e) => setFormAddr({ ...formAddr, state: e.target.value })} className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" />
                            <input type="text" placeholder="Address" value={formAddr.address} onChange={(e) => setFormAddr({ ...formAddr, address: e.target.value })} className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" />
                            <input type="text" placeholder="Postal Code" value={formAddr.postal} onChange={(e) => setFormAddr({ ...formAddr, postal: e.target.value })} className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>

                        <div className="flex justify-end gap-3 mt-5">
                            <button onClick={closeAddressModal} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Cancel</button>
                            <button onClick={editingIndex !== null ? saveEditedAddress : addAddress} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"><FiSave /> Save</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirm Delete Modal */}
            {confirmModal.show && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={cancelDelete} />
                    <div className="relative bg-white rounded-lg shadow-xl w-full max-w-sm p-6 text-center">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Delete this address?</h3>
                        <p className="text-gray-600 mb-5">This action cannot be undone. Are you sure?</p>
                        <div className="flex justify-center gap-3">
                            <button onClick={cancelDelete} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Cancel</button>
                            <button onClick={() => confirmDelete()} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Profile Modal */}
            {showEditProfile && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setShowEditProfile(false)} />
                    <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">Edit Profile</h3>
                        <div className="space-y-3">
                            <input type="text" placeholder="Full Name" value={profileForm.name} onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })} className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" />
                            <input type="email" placeholder="Email" value={profileForm.email} onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })} className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                        <div className="flex justify-end gap-3 mt-5">
                            <button onClick={() => setShowEditProfile(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Cancel</button>
                            <button onClick={saveProfile} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"><FiSave /> Save</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast */}
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </div>
    );
};

export default Profile;
