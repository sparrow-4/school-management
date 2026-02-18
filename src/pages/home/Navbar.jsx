import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineSchool } from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const baseStyle =
  "relative text-gray-600 hover:text-blue-600 transition font-medium  pb-1 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300";

const activeStyle = "text-blue-600 after:w-full";



  return (
    <nav className="w-full bg-white shadow-sm border-b border-black/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <MdOutlineSchool className="text-white text-2xl" />
            </div>
            <span className="text-lg font-semibold text-gray-800">
              EduEvents
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `${baseStyle} ${isActive ? activeStyle : ""}`
                  }
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/events"
                  className={({ isActive }) =>
                    `${baseStyle} ${isActive ? activeStyle : ""}`
                  }
                >
                  Events
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `${baseStyle} ${isActive ? activeStyle : ""}`
                  }
                >
                  About
                </NavLink>
              </li>
            </ul>

            <NavLink
              to="/login"
              className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium  hover:bg-blue-600 hover:text-amber-50 transition"
            >
              Login
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <HiX className="text-2xl text-gray-700" />
              ) : (
                <HiMenu className="text-2xl text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 space-y-4 bg-white border-t">
          <NavLink
            to="/"
            end
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block ${isActive ? "text-blue-600 font-semibold" : "text-gray-600"}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/events"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block ${isActive ? "text-blue-600 font-semibold" : "text-gray-600"}`
            }
          >
            Events
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block ${isActive ? "text-blue-600 font-semibold" : "text-gray-600"}`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/login"
            onClick={() => setIsOpen(false)}
            className="block bg-blue-100  px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 hover:text-amber-50 transition"
          >
            Login
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
