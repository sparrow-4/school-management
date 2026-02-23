import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const ADMIN_EMAIL = "verthe30@gmail.com";
  const ADMIN_PASSWORD = "123";

  const STUDENT_EMAIL = "student@gmail.com";
  const STUDENT_PASSWORD = "123";

  const TEACHER_EMAIL = "teacher@gmail.com";
  const TEACHER_PASSWORD = "123";

  const [mail, setMail] = useState(null);
  const [error, setError] = useState("");

  const login = (email, password, role) => {
    setError("");

    const generateOtp = () => {
      return Math.floor(100000 + Math.random() * 900000).toString();
    };

    if (!role) {
      setError("Select a role.");
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

    // ================= ADMIN =================
    if (role === "admin") {
      if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
        setError("Invalid administrator credentials.");
        return false;
      }

      const otp = generateOtp();
      const expiry = Date.now() + 1 * 60 * 1000;

      localStorage.setItem("otp", otp);
      localStorage.setItem("otp_expiry", expiry.toString());
      localStorage.setItem("otp_email", email);
      localStorage.setItem("pending_role", "admin");

      console.log("Generated OTP:", otp);

      setMail(email);
      return true;
    }

    // ================= STUDENT =================
    if (role === "student") {
      if (email !== STUDENT_EMAIL || password !== STUDENT_PASSWORD) {
        setError("Invalid student credentials.");
        return false;
      }

      setMail(email);
      return true;
    }

    // ================= TEACHER =================
    if (role === "teacher") {
      if (email !== TEACHER_EMAIL || password !== TEACHER_PASSWORD) {
        setError("Invalid teacher credentials.");
        return false;
      }

      setMail(email);
      return true;
    }

    setError("Invalid role.");
    return false;
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
    localStorage.setItem("role", "admin");
    localStorage.removeItem("otp");
  localStorage.removeItem("otp_expiry");
  localStorage.removeItem("otp_email");
  localStorage.removeItem("pending_role");

    return true;
  };

  const resendOtp = () => {
    const storedEmail = localStorage.getItem("otp_email");

    if (!storedEmail) {
      setError("Session expired. Please login again.");
      return false;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = Date.now() + 1 * 60 * 1000;

    localStorage.setItem("otp", otp);
    localStorage.setItem("otp_expiry", expiry.toString());

    console.log("Resent OTP:", otp);

    setError("");
    return true;
  };

  return (
    <AuthContext.Provider
      value={{ mail, login, resendOtp, verifyOtp, error, setError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);