import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Home from "./pages/home/Home";
import Login from "./pages/Login/Login";
import Otp from "./pages/Otp";

/* ================= ADMIN ================= */
import Admin from "./components/dashboard/admin/Admin";
import ManageUsers from "./components/dashboard/admin/ManageUsers";

/* ================= STUDENT ================= */
import Student from "./components/dashboard/student/Student";
import Dashboard from "./components/dashboard/student/Dashboard";
import AddEvent from "./components/dashboard/student/AddEvent";
import MyEvents from "./components/dashboard/student/MyEvents";
import ProfileSidebar from "./components/dashboard/student/ProfileSidebar";

/* ================= TEACHER ================= */
import Teacher from "./components/dashboard/teacher/Teacher";
import TeacherDashboard from "./components/dashboard/teacher/TeacherDashboard";
import AddStudents from "./components/dashboard/teacher/AddStudents";
import ReviewEvents from "./components/dashboard/teacher/ReviewEvents";
import TeacherProfile from "./components/dashboard/teacher/TeacherProfile";
import Overview from "./components/dashboard/admin/Overview";

const App = () => {
  return (
  <>
  <Toaster position="top-right" />
    <Routes>

      {/* PUBLIC */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/otp" element={<Otp />} />

      {/* ================= ADMIN ================= */}
      <Route path="/admin" element={
        <ProtectedRoute allowedRole="admin">
      <Admin />
    </ProtectedRoute>
  }>
        <Route index element={<Overview />} />
        <Route path="overview" element={<Overview />} />
        <Route path="users" element={<ManageUsers />} />
      </Route>

      {/* ================= STUDENT ================= */}
      <Route path="/student" element={<ProtectedRoute allowedRole="student">
      <Student />
    </ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="addevent" element={<AddEvent />} />
        <Route path="myevents" element={<MyEvents />} />
        <Route path="profile" element={<ProfileSidebar />} />
      </Route>

      {/* ================= TEACHER ================= */}
      <Route path="/teacher" element={<ProtectedRoute allowedRole="teacher">
      <Teacher />
    </ProtectedRoute>}>
        <Route index element={<TeacherDashboard />} />
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="add-students" element={<AddStudents />} />
        <Route path="review-events" element={<ReviewEvents />} />
        <Route path="profile" element={<TeacherProfile />} />
      </Route>

    </Routes>
    </>
  );
};

export default App;