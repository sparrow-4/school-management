import { MdDashboard } from "react-icons/md";
import { AiOutlineFileProtect } from "react-icons/ai";
import { MdEventAvailable } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { BiSolidReport } from "react-icons/bi";
import { IoIosSettings } from "react-icons/io";



export const adminMenu = [
  {
    name: "Dashboard Overview",
    path: "/admin/dashboard",
    icon: MdDashboard,
  },
 
  {
    name: "Approve Events",
    path: "/admin/approve-events",
    icon: MdEventAvailable,
  },
  {
    name: "Manage Users",
    path: "/admin/users",
    icon: HiUsers,
  },
  {
    name: "Reports",
    path: "/admin/reports",
    icon: BiSolidReport,
  },
  {
    name: "System Settings",
    path: "/admin/settings",
    icon: IoIosSettings,
  },
];

