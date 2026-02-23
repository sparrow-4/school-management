import React from "react";
import imge from "../../../assets/images/admin.jpg";
import { IoMdNotificationsOutline } from "react-icons/io";


const Navbar = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 px-6 py-4">
      <div className="flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-4">
          

          <h2 className="text-xl font-semibold text-slate-900">
           Admin <br /> Dashboard
          </h2>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-black text-2xl hover:bg-blue-600 hover:text-amber-50 rounded-full cursor-pointer">
            <IoMdNotificationsOutline />  
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-900 leading-none">
                Admin User
              </p>
              <p className="text-xs text-slate-500 mt-1">
                System Administrator
              </p>
            </div>

            <img
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full border-2 border-primary/20"
              src={imge}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
