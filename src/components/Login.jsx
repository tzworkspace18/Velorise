import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [fullName, setFullName] = useState(""); // ✅ New field added
  const navigate = useNavigate();

  // ✅ Redirect if already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      navigate("/profile");
    }
  }, [navigate]);

  const sendOtp = () => {
    if (mobile.length === 10 && fullName.trim() !== "") {
      setOtpSent(true);
      alert("Demo OTP sent! Use 1596 to login.");
    } else if (fullName.trim() === "") {
      alert("Please enter your full name");
    } else {
      alert("Enter a valid 10-digit mobile number");
    }
  };

  const verifyOtp = () => {
    if (otp === "1596") {
      const userData = {
        name: fullName,
        mobile: "6355848312",
        email: "user@example.com",
      };
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/profile");
    } else {
      alert("Invalid OTP. Use demo OTP: 1596");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-green-100 to-white px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md min-h-[500px] flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Welcome Back
        </h2>

        {/* ✅ Full Name Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        {/* Mobile Number Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mobile Number
          </label>
          <input
            inputMode="numeric"
            pattern="[0-9]*"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 
              appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="Enter 10-digit number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))} // digits only
            maxLength={10}
          />
        </div>

        {!otpSent ? (
          <button
            onClick={sendOtp}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium"
          >
            Send OTP
          </button>
        ) : (
          <>
            <div className="mt-6 mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter OTP
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 
                  appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="Enter OTP (1234)"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button
              onClick={verifyOtp}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium"
            >
              Verify & Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
