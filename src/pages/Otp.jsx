import React, { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

const Otp = () => {
  const { mail, verifyOtp, resendOtp, error, setError } = useAuth();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  /* ===============================
     BLOCK IF ALREADY LOGGED IN
  =============================== */
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "admin") {
      navigate("/admin");
    }
  }, [navigate]);

  /* ===============================
     BLOCK DIRECT ACCESS
  =============================== */
  useEffect(() => {
  const pending = localStorage.getItem("pending_role");
  if (pending !== "admin") {
    navigate("/login", { replace: true });
  }
}, []);

  /* ===============================
     LOADER DELAY
  =============================== */
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  /* ===============================
     TIMER SYNC WITH STORAGE
  =============================== */
  useEffect(() => {
    const interval = setInterval(() => {
      const expiry = localStorage.getItem("otp_expiry");

      if (!expiry) return;

      const remaining = Math.floor(
        (Number(expiry) - Date.now()) / 1000
      );

      if (remaining <= 0) {
        setTimeLeft(0);
        setError("OTP expired. Please resend.");
        setOtp(Array(6).fill(""));
        clearInterval(interval);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [setError]);

  if (loading) return <Loader />;

  /* ===============================
     INPUT HANDLING
  =============================== */
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) return;

    if (error) setError("");

    const newOtp = [...otp];
    newOtp[index] = value[0];
    setOtp(newOtp);

    if (index < 5) {
      e.target.nextElementSibling?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];

      if (newOtp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        e.target.previousElementSibling?.focus();
      }
    }
  };

  /* ===============================
     SUBMIT
  =============================== */
  const handleSubmit = (e) => {
    e.preventDefault();

    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      setError("Please enter complete 6-digit OTP.");
      return;
    }

    const success = verifyOtp(finalOtp);

    if (success) {
      navigate("/admin" , { replace: true });
    }
  };

  /* ===============================
     RESEND
  =============================== */
  const handleResend = () => {
    if (timeLeft > 0) return;

    const success = resendOtp();

    if (success) {
      const expiry = localStorage.getItem("otp_expiry");

      if (expiry) {
        const remaining = Math.floor(
          (Number(expiry) - Date.now()) / 1000
        );
        setTimeLeft(remaining > 0 ? remaining : 0);
      }

      setOtp(Array(6).fill(""));
      setError("");
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="font-display bg-background-light min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center p-4 border-b border-slate-100">
          <button
            onClick={() => navigate("/login", { replace: true })}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-50 transition"
          >
            <FiArrowLeft className="text-xl" />
          </button>

          <h1 className="flex-1 text-center text-sm font-semibold uppercase tracking-wider text-slate-900 pr-10">
            Verify Identity
          </h1>
        </div>

        {/* Content */}
        <div className="p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-gray-100">
              <MdOutlineAdminPanelSettings className="text-5xl text-blue-600" />
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Administrator Verification
            </h2>

            <p className="text-sm text-slate-500 leading-relaxed">
              Enter the 6-digit security code sent to:
              <br />
              <span className="font-medium text-slate-900">
                {mail || localStorage.getItem("otp_email")}
              </span>
            </p>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="flex justify-center gap-4">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className={`lg:w-14 lg:h-16 w-10 h-12 text-center lg:text-2xl text-xl font-bold rounded-xl border-2 
                  ${error ? "border-red-400" : "border-slate-200"} 
                  bg-transparent focus:border-blue-500 focus:scale-105 focus:shadow-md transition-all duration-200`}
                />
              ))}
            </div>

            <div className="mt-10 text-center space-y-4">
              <p className="text-sm text-slate-500">
                Didn't receive the code?
                <button
                  onClick={handleResend}
                  disabled={timeLeft > 0}
                  className={`ml-1 font-semibold 
                  ${timeLeft > 0 
                    ? "text-gray-400 cursor-not-allowed" 
                    : "text-blue-600 hover:underline"}`}
                >
                  Resend Code
                </button>
              </p>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                <span className="material-symbols-outlined text-sm">
                  schedule
                </span>
                <span>
                  {timeLeft > 0 
                    ? `Resend in ${formatTime(timeLeft)}` 
                    : "You can resend now"}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-600/20 transition"
            >
              <span>Verify and Sign In</span>
              <span className="material-symbols-outlined text-lg">login</span>
            </button>
          </form>
        </div>

        <div className="flex p-6 text-center justify-center bg-slate-50 border-t border-slate-100">
          <span
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-600 transition cursor-pointer"
            onClick={() => navigate("/login", { replace: true })}
          >
            <GoArrowLeft className="text-lg" />
            Back to Login
          </span>
        </div>
      </div>

      {error && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg shadow-sm bg-red-50 border border-red-200 text-red-700">
            <span className="material-symbols-outlined text-red-500">error</span>
            <span className="text-sm font-medium">{error}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Otp;