import { MdDashboard } from "react-icons/md";
import { MdEventAvailable } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { IoIosSettings } from "react-icons/io";

export const adminMenu = [
  {
    name: "Dashboard Overview",
    path: "/admin/overview",
    icon: MdDashboard,
  },

 
  {
    name: "Manage Users",
    path: "/admin/users",
    icon: HiUsers,
  },
  {
    name: "System Settings",
    path: "/admin/settings",
    icon: IoIosSettings,
  },
];
