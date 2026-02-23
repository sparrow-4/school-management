import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ProfileSidebar = ({
  isOpen = false,
  onClose = () => {},
  student = {},
}) => {
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);

  // Safe destructuring
  const { name = "Student", email = "student@email.com" } = student;

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
        <div className="p-6 border-b border-slate-200 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
            {firstLetter}
          </div>

          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-sm text-slate-500">{email}</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <p className="text-slate-600">Student Profile Panel</p>
        </div>

        {/* Logout */}
        <div className="p-6 border-t border-slate-200">
          <button className="w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition">
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar;