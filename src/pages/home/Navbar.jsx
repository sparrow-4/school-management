import React, { useEffect, useState, useRef  } from "react";
import { MdOutlineSchool } from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("home");
  const isClickScrolling = useRef(false);

const navigate = useNavigate();

   const baseStyle =
 "relative text-gray-600 hover:text-blue-600 transition font-medium  pb-1 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300";
  const activeStyle = "text-blue-600 after:w-full";

 

  
useEffect(() => {
  const onScroll = () => {
    if (isClickScrolling.current) return;

    const sections = {
      home: document.getElementById("home"),
      events: document.getElementById("events"),
      about: document.getElementById("about"),
    };

    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    
    if (scrollTop + windowHeight >= documentHeight - 5) {
      setActive("about");
      return;
    }

   
    if (sections.about && scrollTop >= sections.about.offsetTop - 150) {
      setActive("about");
    } else if (sections.events && scrollTop >= sections.events.offsetTop - 150) {
      setActive("events");
    } else {
      setActive("home");
    }
  };

  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
}, []);


const scrollTo = (id, name) => {
  const section = document.getElementById(id);
  if (!section) return;

  isClickScrolling.current = true;

  section.scrollIntoView({ behavior: "smooth" });
  setActive(name);
  setIsOpen(false);

  setTimeout(() => {
    isClickScrolling.current = false;
  }, 800); 
};






  return (
    <nav className="w-full bg-white shadow-sm border-b border-black/20 fixed top-0 z-50">
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
             <button
  onClick={() => scrollTo("home", "home")}
  className={`${baseStyle} ${active === "home" ? activeStyle : ""}`}
>
  Home
</button>

              </li>

              <li>
                <button
                  onClick={() => scrollTo("events", "events")}
                  className={`${baseStyle} ${
                    active === "events" ? activeStyle : ""
                  }`}
                >
                  Events
                </button>
              </li>

              <li>
                <button
                  onClick={() => scrollTo("about", "about")}
                  className={`${baseStyle} ${
                    active === "about" ? activeStyle : ""
                  }`}
                >
                  About
                </button>
              </li>

            </ul>
            <button onClick={() => navigate("/login")}
             className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm 
             font-medium hover:bg-blue-600 hover:text-white">
            Login
          </button>
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
        <button
  onClick={() => scrollTo("home", "home")}
  className={`block ${
    active === "home" ? "text-blue-600 font-semibold" : "text-gray-900"
  }`}
>
  Home
</button>


          <button
            onClick={() => scrollTo("events", "events")}
            className={`block ${
              active === "events"
                ? "text-blue-600 font-semibold"
                : "text-gray-600"
            }`}
          >
            Events
          </button>

          <button
            onClick={() => scrollTo("about", "about")}
            className={`block ${
              active === "about"
                ? "text-blue-600 font-semibold"
                : "text-gray-600"
            }`}
          >
            About
          </button>
            <button
  onClick={() => navigate("/login")}
  className={`block ${
    active === "about"
      ? "text-blue-600 font-semibold"
      : "text-gray-600"
  }`}
>
  LogIn
</button>

          
        </div>
      )}
    </nav>
  );
};

export default Navbar;