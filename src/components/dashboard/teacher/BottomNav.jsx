import React, { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { menu } from "../../../constants/teacher.js";

const BottomNav = () => {

  const navRef = useRef(null);
  const blobRef = useRef(null);
  const buttonsRef = useRef([]);
  const location = useLocation();

  // NAV SLIDE UP
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }
    );
  }, []);

  // MOVE ACTIVE BLOB (CENTERED)
  useEffect(() => {
    const index = menu.findIndex(i => i.path === location.pathname);
    const btn = buttonsRef.current[index];
    if (!btn) return;

    gsap.to(blobRef.current, {
      x: btn.offsetLeft + (btn.offsetWidth - 48) / 2,
      duration: 0.35,
      ease: "power3.out"
    });

  }, [location.pathname]);

  return (
    <div
      ref={navRef}
      className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50"
    >

      {/* NAV CONTAINER */}
      <div className="relative flex items-center bg-white shadow-xl rounded-full px-2 py-2 overflow-hidden">

        {/* ACTIVE BLOB */}
        <div
          ref={blobRef}
          className="absolute top-3 left-0 w-12 h-12 bg-blue-600 rounded-full shadow-md"
        />

        {/* MENU */}
        {menu.map((item, i) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={i}
              to={item.path}
              ref={el => buttonsRef.current[i] = el}
              className={({ isActive }) =>
                `relative z-10 flex items-center justify-center w-16 h-14 transition-all duration-300
                ${isActive ? "text-white" : "text-gray-500"}`
              }
            >
              <Icon size={20} />
            </NavLink>
          );
        })}

      </div>
    </div>
  );
};

export default BottomNav;