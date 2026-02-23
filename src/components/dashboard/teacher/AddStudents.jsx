import React, { useState } from "react";

const AddStudents = () => {

  const [showForm, setShowForm] = useState(false);
  

  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    className: "",
    section: "",
    roll: "",
    gender: "",
    address: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setStudents([...students, formData]);

    setFormData({
      name: "",
      age: "",
      className: "",
      section: "",
      roll: "",
      gender: "",
      address: ""
    });

    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">

      {/* TOP SECTION */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Students
        </h2>

        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Student
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-white shadow-md rounded-2xl p-6 max-w-3xl mx-auto mb-8">

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >

            <input name="name" value={formData.name} onChange={handleChange}
              placeholder="Full Name"
              className="border rounded-lg px-3 py-2" />

            <input type="number" name="age" value={formData.age} onChange={handleChange}
              placeholder="Age"
              className="border rounded-lg px-3 py-2" />

            <input name="className" value={formData.className} onChange={handleChange}
              placeholder="Class"
              className="border rounded-lg px-3 py-2" />

            <input name="section" value={formData.section} onChange={handleChange}
              placeholder="Section"
              className="border rounded-lg px-3 py-2" />

            <input name="roll" value={formData.roll} onChange={handleChange}
              placeholder="Roll No"
              className="border rounded-lg px-3 py-2" />

            <select name="gender" value={formData.gender} onChange={handleChange}
              className="border rounded-lg px-3 py-2">
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>

            <textarea name="address" value={formData.address} onChange={handleChange}
              placeholder="Address"
              className="md:col-span-2 border rounded-lg px-3 py-2" />

            <div className="md:col-span-2 text-right">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Save Student
              </button>
            </div>

          </form>
        </div>
      )}

      {/* STUDENT LIST */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

        {students.map((student, index) => (
          <div
            key={index}
            className="bg-white shadow rounded-xl p-4"
          >
            <h3 className="text-lg font-semibold mb-1">
              {student.name}
            </h3>
            <p className="text-sm text-gray-500">
              Class: {student.className} - {student.section}
            </p>
            <p className="text-sm text-gray-500">
              Roll No: {student.roll}
            </p>
            <p className="text-sm text-gray-500">
              Age: {student.age}
            </p>
            <p className="text-sm text-gray-500">
              Gender: {student.gender}
            </p>
            <p className="text-sm text-gray-500">
              {student.address}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
};

export default AddStudents;