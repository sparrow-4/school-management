import React from "react";
import { LayoutDashboard, ClipboardList, User, LogOut, UserPlus2 } from "lucide-react";
import { MdOutlineSchool } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Sidebar = () => {

  const navStyle = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg transition
     ${isActive 
       ? "bg-blue-600 text-white" 
       : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"}
     text-sm font-medium`;

  return (
    <div className="hidden md:flex w-64 h-screen bg-white shadow-md p-4 flex-col justify-between">

      {/* Profile */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-blue-600 p-2 rounded-lg">
            <MdOutlineSchool className="text-white text-xl" />
          </div>
          <div>
            <h2 className="text-base font-semibold">Dr. Smith</h2>
            <p className="text-xs text-gray-500">FACULTY HEAD</p>
          </div>
        </div>

        {/* Menu */}
        <ul className="space-y-2">
          <li>
            <NavLink to="/teacher/dashboard" className={navStyle}>
              <LayoutDashboard size={18}/>
              Dashboard
            </NavLink>
          </li>

           <li>
            <NavLink to="/teacher/add-students" className={navStyle}>
              <UserPlus2 size={18}/>
              Add Students
            </NavLink>
          </li>

          <li>
            <NavLink to="/teacher/review-events" className={navStyle}>
              <ClipboardList size={18}/>
              Review Events
            </NavLink>
          </li>

          <li>
            <NavLink to="/teacher/profile" className={navStyle}>
              <User size={18}/>
              Profile
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Logout */}
      <div className="flex items-center gap-3 text-red-500 text-sm cursor-pointer hover:text-red-600">
        <LogOut size={18}/>
        Logout
      </div>

    </div>
  );
};

export default Sidebar;