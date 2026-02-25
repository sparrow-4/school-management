import React, { useState, useEffect } from "react";

const AddStudents = () => {
  const [showForm, setShowForm] = useState(false);
  const [students, setStudents] = useState([]);


  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    className: "",
    section: "",
    roll: "",
    gender: "",
    address: "",
  });

  // ✅ Load from localStorage
  useEffect(() => {
    const savedStudents = localStorage.getItem("students");
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    }
  }, []);

  // ✅ Save to localStorage
  useEffect(() => {
    if (students.length > 0) {
      localStorage.setItem("students", JSON.stringify(students));
    }
  }, [students]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      // ✏ Update student
      const updatedStudents = students.map((student) =>
        student.id === editId ? { ...student, ...formData } : student
      );
      setStudents(updatedStudents);
      setEditId(null);
    } else {
      // ➕ Add student
      const newStudent = {
        id: Date.now(),
        ...formData,
      };
      setStudents((prev) => [...prev, newStudent]);
    }

    setFormData({
      name: "",
      age: "",
      className: "",
      section: "",
      roll: "",
      gender: "",
      address: "",
    });

    setShowForm(false);
  };

  // 🗑 Delete
  const handleDelete = (id) => {
    const filtered = students.filter((student) => student.id !== id);
    setStudents(filtered);
  };

  // ✏ Edit
  const handleEdit = (student) => {
    setFormData(student);
    setEditId(student.id);
    setShowForm(true);
  };



  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-4 md:p-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-blue-600 tracking-tight">
            Student Management
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Manage and organize student records
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-xl shadow-md 
        hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          + Add Student
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          {/* Dark Overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowForm(false)}
          ></div>

          {/* Modal Box */}
          <div className="relative bg-white w-full max-w-4xl mx-4 rounded-3xl shadow-2xl p-8 animate-fadeIn">

            {/* Close Button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold text-blue-600 mb-6">
              {editId ? "Update Student" : "Add New Student"}
            </h3>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-800 outline-none transition"
              />

              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
                required
                className="border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-800 outline-none transition"
              />

              <input
                name="className"
                value={formData.className}
                onChange={handleChange}
                placeholder="Class"
                required
                className="border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-800 outline-none transition"
              />

              <input
                name="section"
                value={formData.section}
                onChange={handleChange}
                placeholder="Section"
                required
                className="border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-800 outline-none transition"
              />

              <input
                name="roll"
                value={formData.roll}
                onChange={handleChange}
                placeholder="Roll Number"
                required
                className="border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-800 outline-none transition"
              />

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-800 outline-none transition"
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                required
                className="md:col-span-2 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-800 outline-none transition"
              />

              <div className="md:col-span-2 text-right">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl shadow-md 
                    hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  {editId ? "Update Student" : "Save Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Student Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 
      shadow-sm hover:shadow-2xl hover:-translate-y-2 
      transition-all duration-500 group"
          >
            {/* Top Section */}
            <div className="flex items-center gap-4 mb-4">

              {/* Profile Circle */}
              <div className="w-14 h-14 rounded-full bg-blue-600 text-white 
        flex items-center justify-center text-lg font-semibold 
        shadow-md group-hover:scale-110 transition duration-300">
                {student.name.charAt(0).toUpperCase()}
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-800">
                  {student.name}
                </h3>
                <p className="text-sm text-slate-500">
                  Class {student.className} - {student.section}
                </p>
              </div>

              <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                Roll {student.roll}
              </span>
            </div>

            {/* Details */}
            <div className="space-y-2 text-sm text-slate-600 mb-6">
              <p><span className="font-medium text-slate-800">Age:</span> {student.age}</p>
              <p><span className="font-medium text-slate-800">Gender:</span> {student.gender}</p>
              <p className="line-clamp-2">
                <span className="font-medium text-slate-800">Address:</span> {student.address}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(student)}
                className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl 
          hover:bg-blue-700 hover:scale-105 shadow-md 
          transition-all duration-300"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(student.id)}
                className="flex-1 bg-blue-100 text-blue-700 py-2.5 rounded-xl 
          hover:bg-blue-200 hover:scale-105 
          transition-all duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddStudents;