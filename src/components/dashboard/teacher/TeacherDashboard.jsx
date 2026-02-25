import React, { useEffect, useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#3b82f6", "#ec4899"];

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);
  const [selectedYear, setSelectedYear] = useState("1");

  const loggedTeacher = JSON.parse(localStorage.getItem("loggedTeacher"));

  const upcomingEvents = [
    { id: 1, title: "AI Symposium", date: "Oct 24, 2025", status: "approved" },
    { id: 2, title: "Hackathon", date: "Dec 5, 2025", status: "approved" },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("students");
    if (saved) setStudents(JSON.parse(saved));
  }, []);

  /* ================= FILTER DEPARTMENT ================= */
  const departmentStudents = useMemo(() => {
    if (!loggedTeacher?.department) return [];
    return students.filter(
      (s) => s.className === loggedTeacher.department
    );
  }, [students, loggedTeacher]);

  /* ================= FILTER BY SELECTED YEAR ================= */
  const yearStudents = useMemo(() => {
    return departmentStudents.filter(
      (s) => s.section === selectedYear
    );
  }, [departmentStudents, selectedYear]);

  const total = yearStudents.length;
  const male = yearStudents.filter((s) => s.gender === "Male").length;
  const female = yearStudents.filter((s) => s.gender === "Female").length;

  const genderData = [
    { name: "Male", value: male },
    { name: "Female", value: female },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8 space-y-12">

      {/* ================= HOD SECTION ================= */}
      {loggedTeacher?.isHod && (
        <>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {loggedTeacher.department} Dashboard
            </h1>
            <p className="text-gray-500 mt-2">
              Department Year Analysis
            </p>
          </div>

          {/* YEAR SELECTOR */}
          <div className="flex gap-4">
            {["1", "2", "3"].map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-6 py-2 rounded-xl font-medium transition ${
                  selectedYear === year
                    ? "bg-blue-600 text-white"
                    : "bg-white shadow"
                }`}
              >
                {year} Year
              </button>
            ))}
          </div>

          {/* SUMMARY */}
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-sm text-gray-500">
                Total Students
              </h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {total}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-sm text-gray-500">Male</h3>
              <p className="text-3xl font-bold text-indigo-600 mt-2">
                {male}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-sm text-gray-500">Female</h3>
              <p className="text-3xl font-bold text-pink-600 mt-2">
                {female}
              </p>
            </div>
          </div>

          {/* PIE CHART */}
          <div className="bg-white p-8 rounded-3xl shadow mt-8">
            <h2 className="text-xl font-semibold mb-6">
              Gender Distribution - {selectedYear} Year
            </h2>

            <div className="h-80">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {/* ================= UPCOMING EVENTS (ALL TEACHERS) ================= */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Upcoming Events
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-gray-800">
                {event.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {event.date}
              </p>
              <span className="inline-block mt-3 px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                {event.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default TeacherDashboard;