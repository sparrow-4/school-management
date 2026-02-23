import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdOutlineSchool } from "react-icons/md";
import { StudentMenu } from "../../../constants/student";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const linkStyle =
    "flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200";

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;

    return `${linkStyle} ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-slate-600 hover:bg-blue-100 hover:text-blue-600"
    }`;
  };

  return (
    <div className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-slate-200">
      
      {/* Logo */}
      <div className="p-6 flex items-center gap-2 font-bold text-xl">
        <MdOutlineSchool className="text-blue-600 size-8" />
        EduEvent
      </div>

      {/* Menu Wrapper */}
      <div className="flex flex-col flex-1 px-4 py-6">

        {/* Menu Items */}
        <div className="space-y-3 font-medium">
          {StudentMenu.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.path}
                onClick={() => navigate(item.path)}
                className={getLinkClass(item.path)}
              >
                <Icon size={20} />
                {item.name}
              </div>
            );
          })}
        </div>

        {/* Logout Section */}
        <div className="mt-auto pt-6">
          <div
            onClick={() => console.log("logout logic here")}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 cursor-pointer transition-all duration-200"
          >
            Logout
          </div>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;