import React from "react";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const teacher = JSON.parse(localStorage.getItem("loggedTeacher"));

  return (
    <div className="h-16 bg-white shadow-sm px-6 flex items-center justify-between">
      
      <h1 className="text-lg font-semibold">Edu Events</h1>

      <div className="flex items-center gap-4">

        <Bell className="text-gray-600 cursor-pointer" />

        {/* Profile Click → Go to Profile Page */}
        <div
          onClick={() => navigate("/teacher/profile")}
          className="cursor-pointer"
        >
          {teacher?.profileImage ? (
            <img
              src={teacher.profileImage}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
              {teacher?.name?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Navbar;