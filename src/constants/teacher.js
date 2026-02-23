import { ClipboardList, LayoutDashboard, User , LogOut, UserPlus2 } from "lucide-react";

export const menu = [
    { name: "Dashboard", path: "/teacher/dashboard", icon: LayoutDashboard },
    { name: "Profile", path: "/teacher/add-students", icon: UserPlus2 },
    { name: "Events", path: "/teacher/review-events", icon: ClipboardList },
    { name: "Profile", path: "/teacher/profile", icon: User },
    { name: "Logout", path: "/", icon: LogOut },
  ];