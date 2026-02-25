import React, { useState, useEffect } from "react";

const TeacherProfile = () => {
  const [teacher, setTeacher] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const logged = JSON.parse(localStorage.getItem("loggedTeacher"));
    setTeacher(logged);
  }, []);

  if (!teacher) {
    return (
      <div className="p-10 text-center text-gray-500">
        No teacher data found.
      </div>
    );
  }

  const handleChange = (e) => {
    setTeacher({
      ...teacher,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // Update teachers array
    const teachers = JSON.parse(localStorage.getItem("teachers")) || [];

    const updatedTeachers = teachers.map((t) =>
      t.id === teacher.id ? teacher : t
    );

    localStorage.setItem("teachers", JSON.stringify(updatedTeachers));
    localStorage.setItem("loggedTeacher", JSON.stringify(teacher));

    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-10">

        {/* Header */}
        <div className="flex items-center gap-6 mb-10">

          <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
            {teacher.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {teacher.name}
            </h1>

            <p className="text-gray-500">
              {teacher.department}
            </p>

            <span
              className={`inline-block mt-2 px-4 py-1 text-xs rounded-full ${
                teacher.isHod
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {teacher.isHod ? "HEAD OF DEPARTMENT" : "FACULTY"}
            </span>
          </div>

        </div>

        {/* Personal Info */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">

          <div>
            <label className="text-sm text-gray-500">Phone</label>
            <input
              name="phone"
              value={teacher.phone}
              onChange={handleChange}
              disabled={!editMode}
              className="w-full mt-1 border rounded-xl px-4 py-2"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Subjects</label>
            <input
              name="className"
              value={teacher.className}
              onChange={handleChange}
              disabled={!editMode}
              className="w-full mt-1 border rounded-xl px-4 py-2"
            />
          </div>

        </div>

        {/* Account Info */}
        <div className="border-t pt-8">

          <h2 className="text-lg font-semibold mb-6 text-gray-800">
            Account Information
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            <div>
              <label className="text-sm text-gray-500">Email</label>
              <input
                value={teacher.email}
                readOnly
                className="w-full mt-1 border bg-gray-100 rounded-xl px-4 py-2"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Teacher ID</label>
              <input
                value={teacher.TeacherID}
                readOnly
                className="w-full mt-1 border bg-gray-100 rounded-xl px-4 py-2"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Password</label>
              <input
                type="password"
                value={teacher.password}
                readOnly
                className="w-full mt-1 border bg-gray-100 rounded-xl px-4 py-2"
              />
            </div>

          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-10">

          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-xl"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-200 px-6 py-2 rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-6 py-2 rounded-xl"
              >
                Save Changes
              </button>
            </>
          )}

        </div>

      </div>
    </div>
  );
};

export default TeacherProfile;