import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#3B82F6", "#EC4899"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Overview = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
    const storedTeachers = JSON.parse(localStorage.getItem("teachers")) || [];

    setStudents(storedStudents);
    setTeachers(storedTeachers);
  }, []);

  /* ================= KPI CALCULATIONS ================= */

  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const totalDepartments = [...new Set(teachers.map(t => t.department))].length;

  const totalHods = teachers.filter(t => t.isHod).length;

  const stats = [
    { title: "Total Students", value: totalStudents },
    { title: "Total Teachers", value: totalTeachers },
    { title: "Departments", value: totalDepartments },
    { title: "HODs", value: totalHods },
  ];

  /* ================= YEAR WISE STUDENT DATA ================= */

  const yearData = useMemo(() => {
    const years = { "1": 0, "2": 0, "3": 0 };

    students.forEach((student) => {
      if (years[student.section] !== undefined) {
        years[student.section]++;
      }
    });

    return [
      { name: "1 Year", students: years["1"] },
      { name: "2 Year", students: years["2"] },
      { name: "3 Year", students: years["3"] },
    ];
  }, [students]);

  /* ================= GENDER DISTRIBUTION ================= */

  const genderData = useMemo(() => {
    const male = students.filter(s => s.gender === "Male").length;
    const female = students.filter(s => s.gender === "Female").length;

    return [
      { name: "Male", value: male },
      { name: "Female", value: female },
    ];
  }, [students]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6 space-y-6"
    >
      {/* Header */}
      <motion.div variants={cardVariants}>
        <h1 className="text-2xl font-semibold text-slate-800">
          Reports & Analytics
        </h1>
        <p className="text-slate-500">
          Live system insights
        </p>
      </motion.div>

      {/* KPI Metrics */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        {stats.map((item, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-slate-100"
          >
            <p className="text-sm text-slate-500">{item.title}</p>
            <p className="text-2xl font-semibold text-slate-800 mt-1">
              {item.value}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {/* Student Growth */}
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-xl p-5 shadow-sm border border-slate-100"
        >
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Students by Year
          </h2>

          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={yearData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students" fill="#3B82F6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Gender Distribution */}
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-xl p-5 shadow-sm border border-slate-100"
        >
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Gender Distribution
          </h2>

          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  label
                >
                  {genderData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Section */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-xl p-5 shadow-sm border border-slate-100"
        >
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-3 text-sm text-slate-600">
            <p>• {totalStudents} students registered</p>
            <p>• {totalTeachers} teachers active</p>
            <p>• {totalHods} HODs assigned</p>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="bg-white rounded-xl p-5 shadow-sm border border-slate-100"
        >
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Quick Info
          </h2>
          <div className="text-sm text-slate-600 space-y-2">
            <p>System running normally</p>
            <p>All departments synced</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Overview;