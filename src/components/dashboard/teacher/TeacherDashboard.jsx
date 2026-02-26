import React, { useEffect, useState, useMemo } from "react";
import { useEvents } from "../../../context/EventContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#3b82f6", "#ec4899" , "#10b981", "#f59e0b", "#8b5cf6", "#ef4444"];

const TeacherDashboard = () => {
  const { events } = useEvents();
  const [students, setStudents] = useState([]);
  const [selectedYear, setSelectedYear] = useState("1");

  const loggedTeacher = JSON.parse(localStorage.getItem("loggedTeacher"));

  const upcomingEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return events
      .filter(
        (event) => event.status === "approved" && new Date(event.date) >= today,
      )
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [events]);

  useEffect(() => {
    const saved = localStorage.getItem("students");
    if (saved) setStudents(JSON.parse(saved));
  }, []);

  /* ================= FILTER DEPARTMENT ================= */
  const departmentStudents = useMemo(() => {
    if (!loggedTeacher?.department) return [];
    return students.filter((s) => s.className === loggedTeacher.department);
  }, [students, loggedTeacher]);

  /* =================  Compute All-Year Count ================= */
  const allYearCount = departmentStudents.length;

  const yearWiseData = [
    {
      name: "1 Year",
      value: departmentStudents.filter((s) => s.section === "1").length,
    },
    {
      name: "2 Year",
      value: departmentStudents.filter((s) => s.section === "2").length,
    },
    {
      name: "3 Year",
      value: departmentStudents.filter((s) => s.section === "3").length,
    },
  ];

  /* ================= FILTER BY SELECTED YEAR ================= */
  const yearStudents = useMemo(() => {
    return departmentStudents.filter((s) => s.section === selectedYear);
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
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
  <div>
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
      {loggedTeacher.department} Dashboard
    </h1>
    <p className="text-gray-500 mt-2 text-sm sm:text-base">
      Department Year Analysis
    </p>
  </div>

  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-6 rounded-3xl shadow-lg w-full sm:w-auto">
    <h2 className="text-sm opacity-80">
      Total Department Students
    </h2>
    <p className="text-3xl sm:text-4xl font-bold mt-2">
      {allYearCount}
    </p>
  </div>
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
              <h3 className="text-sm text-gray-500">Total Students</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">{total}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-sm text-gray-500">Male</h3>
              <p className="text-3xl font-bold text-indigo-600 mt-2">{male}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-sm text-gray-500">Female</h3>
              <p className="text-3xl font-bold text-pink-600 mt-2">{female}</p>
            </div>
          </div>

          {/* PIE CHART */}
          {loggedTeacher?.isHod && total > 0 && (
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             <div className="bg-white p-8 rounded-3xl shadow mt-8">
              <h2 className="text-xl font-semibold mb-6">
                Gender Distribution - {selectedYear} Year
              </h2>

              <div className="w-full h-72 sm:h-80 md:h-96">
                <ResponsiveContainer width="100%" height="100%">
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
            <div className="bg-white p-8 rounded-3xl shadow mt-8">
  <h2 className="text-xl font-semibold mb-6">
    Year-wise Distribution
  </h2>

  <div className="w-full h-72 sm:h-80 md:h-96">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={yearWiseData}
          cx="50%"
          cy="50%"
          outerRadius={100}
          dataKey="value"
          label
        >
          {yearWiseData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
</div>
           </div>

            
          )}
        </>
      )}

      {/* ================= UPCOMING EVENTS (ALL TEACHERS) ================= */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Upcoming Events
        </h2>

        {upcomingEvents.length === 0 ? (
          <p className="text-gray-400">No upcoming events</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition"
              >
                {event.poster && (
                  <img
                    src={event.poster}
                    alt={event.title}
                    className="w-full h-40 object-cover"
                  />
                )}

                <div className="p-5">
                  <h3 className="font-semibold text-gray-800">{event.title}</h3>

                  <p className="text-sm text-gray-500 mt-1">📅 {event.date}</p>

                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {event.description}
                  </p>

                  <span className="inline-block mt-3 px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                    APPROVED
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
