import React, { useEffect, useState } from "react";

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);

 
  const upcomingEvents = [
    {
      id: 1,
      title: "AI Symposium",
      date: "Oct 24, 2025",
      status: "approved",
    },
    {
      id: 2,
      title: "Hackathon",
      date: "Dec 5, 2025",
      status: "approved",
    },
  ];

  useEffect(() => {
    const savedStudents = localStorage.getItem("students");
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    }
  }, []);

  const maleCount = students.filter((s) => s.gender === "Male").length;
  const femaleCount = students.filter((s) => s.gender === "Female").length;
  const totalStudents = students.length;

  const malePercentage =
    totalStudents > 0 ? Math.round((maleCount / totalStudents) * 100) : 0;

  const femalePercentage =
    totalStudents > 0 ? Math.round((femaleCount / totalStudents) * 100) : 0;

  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/*  STUDENT GENDER SECTION */}
      <div className="bg-white rounded-3xl shadow-md p-8 mb-12">

        {/* Title */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl font-bold text-gray-800">
            Student Overview
          </h1>

         
        </div>

        {/* Circles */}
        <div className="grid grid-cols-1 md:grid-cols-3  place-items-center">

          {/* Male Card */}
          <div className="flex flex-col items-center group">

            <div className="relative w-40 h-40">

              <svg className="w-40 h-40 -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="#f1f5f9"
                  strokeWidth="12"
                  fill="transparent"
                />

                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="#3b82f6"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={
                    circumference - (malePercentage / 100) * circumference
                  }
                  strokeLinecap="round"
                  className="transition-all duration-700"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-blue-600">
                  {malePercentage}%
                </span>
                <span className="text-xs text-black mt-1">
                  Male
                </span>
              </div>

            </div>

            <p className="mt-4 text-gray-600 font-medium">
              {maleCount} Students
            </p>

          </div>

           <span className="text-xl ">
            Total Students: {totalStudents}
          </span>


          {/* Female Card */}
          <div className="flex flex-col items-center group">

            <div className="relative w-40 h-40">

              <svg className="w-40 h-40 -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="#f1f5f9"
                  strokeWidth="12"
                  fill="transparent"
                />

                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="#ec4899"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={
                    circumference - (femalePercentage / 100) * circumference
                  }
                  strokeLinecap="round"
                  className="transition-all duration-700"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-pink-500">
                  {femalePercentage}%
                </span>
                <span className="text-xs text-black mt-1">
                  Female
                </span>
              </div>

            </div>

            <p className="mt-4 text-gray-600 font-medium">
              {femaleCount} Students
            </p>

          </div>

        </div>
      </div>
      {/* BOTTOM SECTION - UPCOMING EVENTS */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Upcoming Events
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl p-5 shadow border hover:shadow-lg transition"
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