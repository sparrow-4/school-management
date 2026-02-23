import React, { useState, useRef, useEffect } from "react";
import { HiChevronDown } from "react-icons/hi";

const Navbar2 = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-8 bg-white border-b border-slate-200">
      
      {/* Title */}
      <h1 className="text-lg font-bold text-slate-800">
        New Event Submission
      </h1>

      {/* Profile Section */}
      <div className="relative" ref={dropdownRef}>
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 cursor-pointer hover:bg-slate-100 px-3 py-2 rounded-xl transition-all duration-300"
        >
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-10 h-10 rounded-full object-cover border border-slate-300"
          />
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-slate-700">Admin</p>
            <p className="text-xs text-slate-500">Administrator</p>
          </div>
          <HiChevronDown
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* Dropdown */}
        <div
          className={`absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-xl border border-slate-200 overflow-hidden transform transition-all duration-300 ${
            open
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }`}
        >
          <button className="w-full text-left px-4 py-2 hover:bg-slate-100 text-sm">
            My Profile
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-slate-100 text-sm">
            Settings
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 text-sm">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar2;