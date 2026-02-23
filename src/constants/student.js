import {
  LayoutDashboard,
  PlusCircle,
  CalendarDays,
  Settings,  // ✅ IMPORT IT
} from "lucide-react";

export const StudentMenu = [
  {
    name: "Dashboard",
    path: "/student/dashboard",
    icon: LayoutDashboard,
    type: "route",
  },
  {
    name: "Add Event",
    path: "/student/addevent",
    icon: PlusCircle,
    type: "route",
  },
  {
    name: "My Events",
    path: "/student/myevents",
    icon: CalendarDays,
    type: "route",
  },
];

/* Settings icon (NOT a route) */
export const StudentSettings = {
  name: "Settings",
  icon: Settings,
  type: "sidebar",
};

export const StudentMobileMenu = [
  ...StudentMenu,
  StudentSettings,
];