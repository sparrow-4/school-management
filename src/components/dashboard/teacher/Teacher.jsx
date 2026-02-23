import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";
import Loader from "../../Loader";

const Teacher = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 pb-20 md:pb-4">
          <Outlet />
        </div>

      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

    </div>
  );
};

export default Teacher;