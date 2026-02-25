import React from "react";
import { LayoutDashboard, ClipboardList, User, LogOut, UserPlus2 } from "lucide-react";
import { MdOutlineSchool } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {

  const loggedTeacher = JSON.parse(localStorage.getItem("loggedTeacher"));

  const navStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
     ${isActive
      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
      : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"}
     text-sm font-medium`;

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("session_active");
    localStorage.removeItem("loggedTeacher");
    navigate("/");
  };

  return (
    <div className="hidden md:flex w-72 h-screen bg-linear-to-b from-white to-blue-50 border-r border-gray-200 p-6 flex-col justify-between">

      <div>

        {/* Profile Card */}
        <div className="flex items-center gap-4 mb-10 p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
          <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-3 rounded-xl shadow-md">
            <MdOutlineSchool className="text-white text-2xl" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-800">
              {loggedTeacher?.name || "Teacher"}
            </h2>
            <p className="text-xs text-gray-500 tracking-wide">
              {loggedTeacher?.isHod ? "HEAD" : "FACULTY"}
            </p>
          </div>
        </div>

        <ul className="space-y-3">

          <li>
            <NavLink to="/teacher/dashboard" className={navStyle}>
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>
          </li>

          {/* SHOW ONLY IF HOD */}
          {loggedTeacher?.isHod && (
            <li>
              <NavLink to="/teacher/add-students" className={navStyle}>
                <UserPlus2 size={18} />
                Add Students
              </NavLink>
            </li>
          )}

          <li>
            <NavLink to="/teacher/review-events" className={navStyle}>
              <ClipboardList size={18} />
              Review Events
            </NavLink>
          </li>

          <li>
            <NavLink to="/teacher/profile" className={navStyle}>
              <User size={18} />
              Profile
            </NavLink>
          </li>

        </ul>
      </div>

      <div
        onClick={handleLogout}
        className="p-4 rounded-xl bg-red-50 hover:bg-red-100 transition cursor-pointer flex items-center gap-3 text-red-500 text-sm font-medium"
      >
        <LogOut size={18} />
        Logout
      </div>

    </div>
  );
};

export default Sidebar;