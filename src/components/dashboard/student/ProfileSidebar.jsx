import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

const ProfileSidebar = ({
  isOpen = false,
  onClose = () => {},
}) => {
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);
  const navigate = useNavigate();

  const student =
    JSON.parse(localStorage.getItem("loggedStudent")) || {};

  const {
    name = "Student",
    email = "student@email.com",
    roll = "N/A",
    className = "Department",
    section = "Year",
    gender = "Not Specified",
  } = student;

  const firstLetter = name?.charAt(0)?.toUpperCase() || "S";

  useEffect(() => {
    if (!sidebarRef.current || !overlayRef.current) return;

    if (isOpen) {
      gsap.to(sidebarRef.current, {
        x: 0,
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.3,
      });
    } else {
      gsap.to(sidebarRef.current, {
        x: "100%",
        duration: 0.4,
        ease: "power3.in",
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.3,
      });
    }
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("session_active");
    localStorage.removeItem("loggedStudent");
    navigate("/");
  };

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm opacity-0 z-[60] pointer-events-none"
      />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="fixed top-0 right-0 w-80 h-full bg-white shadow-2xl z-[70] translate-x-full flex flex-col"
      >
        {/* Header */}
        {/* Header */}
<div className="p-6 border-b border-slate-200 flex items-center gap-4">

  {/* Avatar */}
  <div className="relative">
    {student.profileImage ? (
      <img
        src={student.profileImage}
        alt="profile"
        className="w-16 h-16 rounded-full object-cover border-2 border-blue-600"
      />
    ) : (
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 
                      flex items-center justify-center text-white text-2xl font-semibold">
        {firstLetter}
      </div>
    )}
  </div>

  {/* Info */}
  <div className="flex flex-col">
    <h3 className="font-semibold text-lg text-slate-800">
      {name}
    </h3>
    <p className="text-sm text-slate-500 break-all">
      {email}
    </p>
  </div>

</div>

        {/* Profile Info */}
        <div className="flex-1 p-6 space-y-4 text-sm text-slate-700">
          <div className="flex justify-between">
            <span className="text-slate-500">Roll No</span>
            <span className="font-medium">{roll}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">Department</span>
            <span className="font-medium">{className}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">Year</span>
            <span className="font-medium">{section}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">Gender</span>
            <span className="font-medium">{gender}</span>
          </div>
        </div>

        {/* Logout */}
        <div className="p-6 border-t border-slate-200">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar;