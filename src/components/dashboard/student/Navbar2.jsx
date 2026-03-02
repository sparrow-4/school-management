import React, { useState, useRef, useEffect } from "react";
import { HiChevronDown } from "react-icons/hi";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEvents } from "../../../context/EventContext";
import ProfileSidebar from "./ProfileSidebar";

const Navbar2 = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const [seenNotifications, setSeenNotifications] = useState(
    JSON.parse(localStorage.getItem("seenNotifications")) || []
  );

  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  const navigate = useNavigate();
  const { events } = useEvents();

  const loggedStudent = JSON.parse(
    localStorage.getItem("loggedStudent")
  );

  const profileImage =
    loggedStudent?.profileImage ||
    `https://ui-avatars.com/api/?name=${
      loggedStudent?.name || "Student"
    }&background=3B82F6&color=fff`;

  // ✅ Only NEW approved events (not seen yet)
  const newApprovedEvents = events.filter(
    (event) =>
      event.studentId === loggedStudent?.id &&
      event.status === "approved" &&
      !seenNotifications.includes(event.id)
  );

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("session_active");
    localStorage.removeItem("loggedStudent");
    navigate("/");
  };

  const handleNotificationClick = () => {
    if (!notificationOpen && newApprovedEvents.length > 0) {
      const updatedSeen = [
        ...seenNotifications,
        ...newApprovedEvents.map((e) => e.id),
      ];

      setSeenNotifications(updatedSeen);
      localStorage.setItem(
        "seenNotifications",
        JSON.stringify(updatedSeen)
      );
    }

    setNotificationOpen(!notificationOpen);
  };

  return (
    <>
      <header className="h-16 flex items-center justify-between px-4 md:px-8 bg-white border-b border-slate-200">

        <h1 className="text-lg font-bold text-slate-800">
          Student Dashboard
        </h1>

        <div className="flex items-center gap-6">

          {/* 🔔 Notification */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={handleNotificationClick}
              className="relative text-slate-600 hover:text-blue-600 transition"
            >
              <FaBell className="text-xl" />

              {newApprovedEvents.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {newApprovedEvents.length}
                </span>
              )}
            </button>

            {/* Dropdown */}
            <div
              className={`absolute right-0 mt-3 w-64 bg-white shadow-xl rounded-xl border border-slate-200 overflow-hidden transform transition-all duration-300 ${
                notificationOpen
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }`}
            >
              <div className="p-3 border-b font-semibold text-sm">
                Notifications
              </div>

              {newApprovedEvents.length === 0 ? (
                <div className="p-4 text-sm text-slate-500">
                  No new notifications
                </div>
              ) : (
                newApprovedEvents.map((event) => (
                  <div
                    key={event.id}
                    className="px-4 py-3 text-sm hover:bg-slate-100 cursor-pointer border-b last:border-none"
                  >
                    ✅ Your event <b>{event.title}</b> has been approved.
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 👤 Profile */}
          <div className="relative" ref={dropdownRef}>
            <div
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 cursor-pointer hover:bg-slate-100 px-3 py-2 rounded-xl transition-all duration-300"
            >
              <img
                src={profileImage}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover border border-slate-300"
              />

              <div className="hidden md:block">
                <p className="text-sm font-semibold text-slate-700">
                  {loggedStudent?.name || "Student"}
                </p>
                <p className="text-xs text-slate-500">
                  {loggedStudent?.className} - {loggedStudent?.section} Year
                </p>
              </div>

              <HiChevronDown
                className={`transition-transform duration-300 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Profile Dropdown */}
            <div
              className={`absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-xl border border-slate-200 overflow-hidden transform transition-all duration-300 ${
                open
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }`}
            >
              <button
                onClick={() => {
                  setProfileOpen(true);
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-slate-100 text-sm"
              >
                My Profile
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 text-sm"
              >
                Logout
              </button>
            </div>
          </div>

        </div>
      </header>

      <ProfileSidebar
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        student={loggedStudent}
      />
    </>
  );
};

export default Navbar2;