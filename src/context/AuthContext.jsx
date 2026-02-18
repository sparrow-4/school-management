import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const ADMIN_EMAIL = "verthe30@gmail.com";
  const ADMIN_PASSWORD = "123";

  const [mail, setMail] = useState(null);
  const [error, setError] = useState("");

  const login = (email, password, role) => {
    setError("");

// gnrt otppp
const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  if (!role) {
    setError("Invalid");
    return false;
  }

  if (role !== "admin") {
    setError("Invalid .");

    return false;
  }


    if (!email || !password) {
      setError("All fields are required.");
      return false;
    }

   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }


    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      setError("Invalid administrator credentials.");
      return false;
    }
// ✅ Generate OTP
    const otp = generateOtp();
    const expiry = Date.now() + 2 * 60 * 1000; // 2 minutes

    localStorage.setItem("otp", otp);
    localStorage.setItem("otp_expiry", expiry);
    localStorage.setItem("otp_email", email);

    console.log("Generated OTP:", otp); // simulate email sending

    setMail(email);
    return true;
  };
  const verifyOtp = (enteredOtp) => {
    const storedOtp = localStorage.getItem("otp");
    const expiry = localStorage.getItem("otp_expiry");

    if (!storedOtp || !expiry) {
      setError("OTP not found. Please login again.");
      return false;
    }

    if (Date.now() > Number(expiry)) {
      setError("OTP expired.");
      return false;
    }

    if (enteredOtp !== storedOtp) {
      setError("Invalid OTP.");
      return false;
    }

    // Clear OTP after success
    localStorage.removeItem("otp");
    localStorage.removeItem("otp_expiry");

    return true;
  };

  return (
    <AuthContext.Provider value={{ mail, login, verifyOtp, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);