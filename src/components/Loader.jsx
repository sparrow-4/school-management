import React from "react";
import { MdOutlineSchool } from "react-icons/md";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50 overflow-hidden">

      {/* Expanding Rings */}
      <div className="absolute w-40 h-40 border-4 border-blue-200 rounded-full animate-ping"></div>
      <div className="absolute w-60 h-60 border-4 border-blue-100 rounded-full animate-ping animation-delay-600"></div>

      {/* Logo Container */}
      <div className="relative flex items-center justify-center">
        <div className="bg-blue-600 p-4 rounded-2xl shadow-xl animate-pulse">
          <MdOutlineSchool className="text-white text-9xl animate-spin-slow" />
        </div>
      </div>

    </div>
  );
};

export default Loader;
