import React, { useState, useRef, useEffect } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { HiChevronDown } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const loggedAdmin =
    JSON.parse(localStorage.getItem("loggedAdmin")) || {
      name: "Admin User",
      role: "System Administrator",
      profileImage: null,
    };

  const profileImage =
    loggedAdmin.profileImage ||
    `https://ui-avatars.com/api/?name=${loggedAdmin.name}&background=0f172a&color=fff`;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("session_active");
    localStorage.removeItem("loggedAdmin");
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 px-6 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

        {/* Left */}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
            Admin Dashboard
          </h2>
          <p className="text-xs text-slate-500">
            System Overview & Control Panel
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4" ref={dropdownRef}>

          {/* Notification */}
          <button className="relative p-2 text-2xl text-slate-700 hover:bg-slate-100 rounded-full transition">
            <IoMdNotificationsOutline />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 rounded-full">
              3
            </span>
          </button>

          {/* Profile */}
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 cursor-pointer hover:bg-slate-100 px-3 py-2 rounded-xl transition"
          >
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-slate-900">
                {loggedAdmin.name}
              </p>
              <p className="text-xs text-slate-500">
                {loggedAdmin.role}
              </p>
            </div>

            <img
              src={profileImage}
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full object-cover border"
            />

            <HiChevronDown
              className={`transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </div>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-6 top-16 w-44 bg-white shadow-xl rounded-xl border border-slate-200 overflow-hidden">
              <button
                onClick={() => navigate("/admin/profile")}
                className="w-full text-left px-4 py-2 hover:bg-slate-100 text-sm"
              >
                My Profile
              </button>

              <button
                onClick={() => navigate("/admin/settings")}
                className="w-full text-left px-4 py-2 hover:bg-slate-100 text-sm"
              >
                Settings
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;