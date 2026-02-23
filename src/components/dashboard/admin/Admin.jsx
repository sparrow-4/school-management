import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import Loader from "../../Loader"; 

const Admin = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;
  return (
    <div className="h-screen flex bg-gray-100">

      {/* Sidebar FIRST */}
      <div className="hidden md:flex md:w-60 ">
        <Sidebar />
      </div>

      {/* Right Side (Navbar + Content) */}
      <div className="flex flex-col flex-1">

        {/* Navbar inside content area */}
        <Navbar />

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6 pb-20 md:pb-6">
          <Outlet />
        </div>

      </div>

      {/* Mobile Bottom Nav */}
      <BottomNav />

    </div>
  );
};

export default Admin;
