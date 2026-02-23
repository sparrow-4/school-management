import React from "react";
import { Bell } from "lucide-react";
const Navbar = () => {
  return (
    <div className="h-16 bg-white shadow-sm px-6 flex items-center justify-between">
      <div>
        <h1 className="text-lg font-semibold"> Edu Events </h1>
      </div>
      <div className="flex items-center gap-4">
        
        <Bell className="text-gray-600 cursor-pointer" />
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  );
};
export default Navbar;