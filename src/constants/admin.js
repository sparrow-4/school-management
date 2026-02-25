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
    name: "System Settings",
    path: "/admin/settings",
    icon: IoIosSettings,
  },
];

export const userStats = [
  {
    title: "Teaching Staff",
    users: [
      { label: "Teachers", value: 42 },
      { label: "HODs", value: 8 },
    ],
  },
  {
    title: "Students",
    users: [
      { label: "Total Students", value: 320 },
      { label: "Active Participants", value: 210 },
    ],
  },
];

export const stats = [
  { title: "Total Users", value: 420 },
  { title: "Active Students", value: 210 },
  { title: "Events", value: 18 },
  { title: "Engagement Rate", value: "68%" },
];

export const studentData = [
  { name: "Jan", students: 120 },
  { name: "Feb", students: 180 },
  { name: "Mar", students: 210 },
  { name: "Apr", students: 260 },
];

export const staffData = [
  { name: "Teachers", value: 42 },
  { name: "HODs", value: 8 },
];

export const COLORS = ["#3B82F6", "#10B981"];

export const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

export const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35 },
  },
};