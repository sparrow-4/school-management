import React, { createContext, useContext, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  /* ================= INIT EMAILJS ================= */
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

 

  /* ================= STATIC USERS ================= */
  const USERS = {
    admin: {
      email: "thoyyibcherur@gmail.com",
      password: "123",
    },
    student: {
      email: "student@gmail.com",
      password: "123",
    }
  };

  const [mail, setMail] = useState(null);
  const [error, setError] = useState("");

  /* ================= OTP GENERATOR ================= */
  const generateOtp = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

  /* =================================================
                     LOGIN FUNCTION
  ================================================= */
  const login = async (email, password, role) => {

    setError("");

    /* -------- BASIC VALIDATION -------- */
    if (!role) {
      setError("Please select a role.");
      return false;
    }

    if (!email || !password) {
      setError("All fields are required.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      return false;
    }

    /* ================= ADMIN CHECK ================= */
if (role === "admin") {
  const admin = USERS.admin;

  if (email !== admin.email || password !== admin.password) {
    setError("Invalid credentials.");
    return false;
  }
}

/* ================= STUDENT CHECK ================= */
if (role === "student") {
 const students = JSON.parse(localStorage.getItem("students")) || [];

const foundStudent = students.find(
  (s) =>
    s.email.toLowerCase().trim() === email.toLowerCase().trim() &&
    s.password === password
);

if (!foundStudent) {
  setError("Invalid student credentials.");
  return false;
}

localStorage.setItem("loggedStudent", JSON.stringify(foundStudent));
}

/* ================= TEACHER CHECK (DYNAMIC) ================= */
if (role === "teacher") {

  const teachers = JSON.parse(localStorage.getItem("teachers")) || [];

  const foundTeacher = teachers.find(
    (t) =>
      t.email.toLowerCase().trim() === email.toLowerCase().trim() &&
      t.password === password
  );

  if (!foundTeacher) {
    setError("Invalid teacher credentials.");
    return false;
  }

  // Store teacher data for session
  localStorage.setItem("loggedTeacher", JSON.stringify(foundTeacher));
}

    /* =================================================
                     ADMIN FLOW (OTP)
    ================================================= */
    if (role === "admin") {

      const otp = generateOtp();
      const expiry = Date.now() + 1 * 60 * 1000; // 1 min

      try {

        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            to_email: email,
            otp_code: otp,
          }
        );

        // Store temporary OTP data
        localStorage.setItem("otp", otp);
        localStorage.setItem("otp_expiry", expiry.toString());
        localStorage.setItem("otp_email", email);
        localStorage.setItem("pending_role", "admin");

        setMail(email);

        // 🔥 DEBUG ALERT
        alert("OTP generated: " + otp);

        return true;

      } catch (err) {
        console.error("EMAILJS ERROR:", err);
        setError("Failed to send OTP email.");
        return false;
      }
    }

    /* =================================================
                 STUDENT / TEACHER FLOW
    ================================================= */
    localStorage.setItem("role", role);
    localStorage.setItem("session_active", "true");

    setMail(email);

    console.log("Stored role:", localStorage.getItem("role"));

    return true;
  };

  /* =================================================
                    VERIFY OTP
  ================================================= */
  const verifyOtp = (enteredOtp) => {

    const storedOtp = localStorage.getItem("otp");
    const expiry = localStorage.getItem("otp_expiry");
    const pending = localStorage.getItem("pending_role");

    if (!storedOtp || !expiry || pending !== "admin") {
      setError("OTP session invalid. Please login again.");
      return false;
    }

    if (Date.now() > Number(expiry)) {
      setError("OTP expired. Please resend.");
      return false;
    }

    if (enteredOtp !== storedOtp) {
      setError("Invalid OTP.");
      return false;
    }

    // Grant admin access
    localStorage.setItem("role", "admin");
    localStorage.setItem("session_active", "true");

    // Remove temp data
    localStorage.removeItem("otp");
    localStorage.removeItem("otp_expiry");
    localStorage.removeItem("otp_email");
    localStorage.removeItem("pending_role");
    localStorage.removeItem("loggedTeacher");
    localStorage.removeItem("loggedStudent");

    return true;
  };

  /* =================================================
                    RESEND OTP
  ================================================= */
  const resendOtp = async () => {

    const storedEmail = localStorage.getItem("otp_email");
    const pending = localStorage.getItem("pending_role");

    if (!storedEmail || pending !== "admin") {
      setError("Session expired. Please login again.");
      return false;
    }

    const otp = generateOtp();
    const expiry = Date.now() + 5 * 60 * 1000;

    try {

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_email: storedEmail,
          otp_code: otp,
        }
      );

      localStorage.setItem("otp", otp);
      localStorage.setItem("otp_expiry", expiry.toString());

      alert("New OTP: " + otp);

      setError("");
      return true;

    } catch (err) {
      console.error("RESEND ERROR:", err);
      setError("Failed to resend OTP.");
      return false;
    }
  };

  /* =================================================
                        LOGOUT
  ================================================= */
  const logout = () => {

    localStorage.removeItem("role");
    localStorage.removeItem("session_active");
    localStorage.removeItem("otp");
    localStorage.removeItem("otp_expiry");
    localStorage.removeItem("otp_email");
    localStorage.removeItem("pending_role");

    setMail(null);
  };

  return (
    <AuthContext.Provider
      value={{
        mail,
        login,
        verifyOtp,
        resendOtp,
        logout,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);