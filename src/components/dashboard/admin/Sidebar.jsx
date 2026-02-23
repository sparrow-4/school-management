import React from "react";
import { MdOutlineSchool } from "react-icons/md";
import { adminMenu } from "../../../constants/admin";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();   // ✅ FIXED

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">

      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
          <div className="bg-blue-600 p-2 rounded-lg">
            <MdOutlineSchool className="text-white text-2xl" />
          </div>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          CampusAdmin
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {adminMenu.map((item, index) => {
          const Icon = item.icon;

          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}   // now works
              className={`w-full flex cursor-pointer items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                item.active
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-slate-600 hover:bg-blue-600 hover:text-white"
              }`}
            >
              <Icon className="text-xl" />
              {item.name}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-200">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
        >
          <IoLogOutOutline className="text-xl" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;