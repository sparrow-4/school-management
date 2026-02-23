import React, { useEffect, useRef, useState } from "react";
import { StudentMobileMenu } from "../../../constants/student";
import { useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import ProfileSidebar from "./ProfileSidebar";

const BottomNav = () => {
  const navRef = useRef(null);
  const blobRef = useRef(null);
  const buttonsRef = useRef([]);
  const settingsRef = useRef(null);
  const overlayRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const lastScroll = useRef(0);

  const [openSettings, setOpenSettings] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const student = {
    name: "Shahid",
    email: "student@email.com",
  };

  /* Nav mount animation */
  useEffect(() => {
    gsap.fromTo(navRef.current, { y: 80 }, { y: 0, duration: 0.5 });
  }, []);

  /* Active blob animation */
  useEffect(() => {
    const activeIndex = StudentMobileMenu.findIndex(
      (item) => item.path === location.pathname
    );

    if (activeIndex !== -1) {
      const btn = buttonsRef.current[activeIndex];
      if (!btn) return;

      gsap.to(blobRef.current, {
        x: btn.offsetLeft,
        width: btn.offsetWidth,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  }, [location.pathname]);

  /* Hide nav on scroll */
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current > lastScroll.current && current > 50) {
        gsap.to(navRef.current, { y: 100 });
      } else {
        gsap.to(navRef.current, { y: 0 });
      }

      lastScroll.current = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Settings sidebar animation */
  useEffect(() => {
    if (!settingsRef.current || !overlayRef.current) return;

    if (openSettings) {
      gsap.to(settingsRef.current, {
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
      gsap.to(settingsRef.current, {
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
  }, [openSettings]);

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={() => setOpenSettings(false)}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm opacity-0 z-40 pointer-events-none"
      />

      {/* Settings Sidebar */}
      <div
        ref={settingsRef}
        className="fixed top-0 right-0 w-80 h-full bg-white shadow-2xl z-50 translate-x-full flex flex-col"
      >
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-bold">Settings</h2>
        </div>

        <div className="flex-1 p-6 space-y-4">
          <button
            onClick={() => {
              setOpenSettings(false);
              setTimeout(() => setOpenProfile(true), 300);
            }}
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-100 transition"
          >
            Profile
          </button>
        </div>

        <div className="p-6 border-t border-slate-200">
          <button className="w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition">
            Logout
          </button>
        </div>
      </div>

      {/* Bottom Nav */}
      <div
        ref={navRef}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-100 px-2 py-2 rounded-full shadow-xl md:hidden z-30"
      >
        <div className="relative flex items-center gap-2">
          <div
            ref={blobRef}
            className="absolute h-12 bg-black/10 rounded-full"
            style={{ width: 0 }}
          />

          {StudentMobileMenu.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <button
                key={index}
                ref={(el) => (buttonsRef.current[index] = el)}
                onClick={() => {
                  if (item.type === "sidebar") {
                    setOpenSettings(true);
                  } else {
                    navigate(item.path);
                  }
                }}
                className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full
                  ${
                    isActive
                      ? "text-blue-600"
                      : "text-blue-600 hover:text-slate-700"
                  }`}
              >
                <Icon size={22} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Profile Sidebar */}
      <ProfileSidebar
        isOpen={openProfile}
        onClose={() => setOpenProfile(false)}
        student={student}
      />
    </>
  );
};

export default BottomNav;