import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar2 from "./Navbar2";
import BottomNav from "./BottomNav";

const Student = () => {
  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar - Only Desktop */}
      <div className="hidden md:block w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Section */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Navbar - Only Desktop */}
        <div className="hidden md:block h-16 flex-shrink-0">
          <Navbar2 />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <Outlet />
        </div>

        {/* BottomNav - Only Mobile */}
        <div className="md:hidden">
          <BottomNav />
        </div>

      </div>
    </div>
  );
};

export default Student;