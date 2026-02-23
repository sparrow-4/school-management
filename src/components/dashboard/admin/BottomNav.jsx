import React, { useEffect, useRef } from "react";
import { adminMenu } from "../../../constants/admin";
import { useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";

const BottomNav = () => {
  const navRef = useRef(null);
  const blobRef = useRef(null);
  const buttonsRef = useRef([]);
  const lastScroll = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();

  // Slide nav in
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: 80 },
      { y: 0, duration: 0.5, ease: "power3.out" }
    );
  }, []);

  // Move blob when route changes
  useEffect(() => {
    const activeIndex = adminMenu.findIndex(
      (item) => item.path === location.pathname
    );

    if (activeIndex !== -1) {
      const btn = buttonsRef.current[activeIndex];
      const { offsetLeft, offsetWidth } = btn;

      gsap.to(blobRef.current, {
        x: offsetLeft,
        width: offsetWidth,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  }, [location.pathname]);

  // Hide on scroll
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current > lastScroll.current && current > 50) {
        gsap.to(navRef.current, { y: 100, duration: 0.4 });
      } else {
        gsap.to(navRef.current, { y: 0, duration: 0.4 });
      }

      lastScroll.current = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={navRef}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-100 px-2 py-2 sm:px-1 sm:py:1 rounded-full shadow-xl md:hidden z-50"
    >
      <div className="relative flex items-center gap-2">

        {/* Floating Blob */}
        <div
          ref={blobRef}
          className="absolute h-15 bg-black/10 rounded-full"
          style={{ width: 0 }}
        />

        {adminMenu.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={index}
              ref={(el) => (buttonsRef.current[index] = el)}
              onClick={() => navigate(item.path)}
              className={`relative z-10 flex items-center justify-center w-12 h-12 sm:h-10 sm:w-10 rounded-full transition-all duration-300
                ${
                  isActive
                    ? "text-blue-600"
                    : "text-blue-600 hover:text-slate-700"
                }`}
            >
              <Icon className="md:text-3xl sm:text-2xl" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
