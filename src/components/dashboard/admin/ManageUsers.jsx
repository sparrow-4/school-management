import React, { useState, useEffect, useMemo } from "react";
import { HiPlus } from "react-icons/hi";
import { MdOutlineEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { MdOutlineLocalPhone } from "react-icons/md";
import { CiSearch } from "react-icons/ci";

const initialFormState = {
  name: "",
  TeacherID: "",
  email: "",
  password: "",
  className: "",
  department: "",
  Subject: "",
  phone: "",
};

const ManageUsers = () => {
  const [teachers, setTeachers] = useState(() => {
    const saved = localStorage.getItem("teachers");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("teachers", JSON.stringify(teachers));
  }, [teachers]);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState(initialFormState);

  /* ================= FILTER ================= */
  const filteredTeachers = useMemo(() => {
    return teachers.filter((t) =>
      [t.name, t.email, t.department].some((field) =>
        field.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [teachers, searchTerm]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    let updated = { ...formData, [name]: value };

    const cleanName = (updated.name || "")
      .toLowerCase()
      .replace(/\s+/g, "");

    updated.email =
      cleanName && updated.TeacherID
        ? `${cleanName}${updated.TeacherID}@edueventschool.com`
        : "";

    updated.password =
      cleanName && updated.TeacherID
        ? `${cleanName}!${updated.TeacherID}`
        : "";

    setFormData(updated);
  };

  /* ================= ADD / UPDATE ================= */
  const handleAddTeacher = (e) => {
    e.preventDefault();
    setFormError("");

    const emailExists = teachers.some(
      (t) =>
        t.email.toLowerCase().trim() ===
          formData.email.toLowerCase().trim() &&
        t.id !== editId
    );

    if (emailExists) {
      setFormError("This teacher already exists.");
      return;
    }

    if (editId !== null) {
      setTeachers((prev) =>
        prev.map((t) =>
          t.id === editId ? { ...t, ...formData } : t
        )
      );
    } else {
      setTeachers((prev) => [
        ...prev,
        { ...formData, id: Date.now(), isHod: false },
      ]);
    }

    setShowModal(false);
    setEditId(null);
    setFormData(initialFormState);
  };

  const handleEdit = (teacher) => {
    setFormData(teacher);
    setEditId(teacher.id);
    setFormError("");
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setTeachers((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleHod = (id) => {
  setTeachers((prev) => {
    const updatedTeachers = prev.map((t) =>
      t.id === id ? { ...t, isHod: !t.isHod } : t
    );

    // 🔥 Sync loggedTeacher if the same teacher
    const logged = JSON.parse(localStorage.getItem("loggedTeacher"));

    if (logged && logged.id === id) {
      const updatedLogged = updatedTeachers.find((t) => t.id === id);
      localStorage.setItem("loggedTeacher", JSON.stringify(updatedLogged));
    }

    return updatedTeachers;
  });
};

  /* ================= FORM FIELDS CONFIG ================= */
  const formFields = [
    { name: "name", placeholder: "Full Name" },
    { name: "TeacherID", placeholder: "Teacher ID" },
    { name: "className", placeholder: "Subjects they teach" },
    { name: "department", placeholder: "Department" },
    { name: "phone", placeholder: "Phone Number" },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Teachers</h1>
          <p className="text-sm text-gray-500">Manage faculty members</p>
        </div>

        <div className="lg:flex-1 max-w-md relative hidden lg:block">
          <CiSearch className="absolute mt-3.5 ml-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border rounded-lg px-10 py-2"
          />
        </div>

        <button
          onClick={() => {
            setShowModal(true);
            setEditId(null);
            setFormError("");
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <HiPlus /> Add Teacher
        </button>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredTeachers.map((t) => (
          <div key={t.id} className="bg-white p-6 rounded-2xl shadow border">
            <h2 className="text-lg font-bold">{t.name}</h2>
            <p className="text-sm text-gray-500">{t.department}</p>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex gap-2">
                <MdOutlineEmail /> {t.email}
              </div>
              <div className="flex gap-2">
                <CiLock /> ********
              </div>
              <div className="flex gap-2">
                <MdOutlineLocalPhone /> {t.phone}
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => toggleHod(t.id)}
                className={`px-3 py-1 rounded text-white ${
                  t.isHod ? "bg-green-600" : "bg-gray-600"
                }`}
              >
                {t.isHod ? "HOD ✓" : "Make HOD"}
              </button>

              <button
                onClick={() => handleEdit(t)}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(t.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">
              {editId ? "Edit Teacher" : "Add Teacher"}
            </h2>

            <form onSubmit={handleAddTeacher} className="space-y-4">
              {formError && (
                <p className="text-red-600 text-sm">{formError}</p>
              )}

              {formFields.map((field) => (
                <input
                  key={field.name}
                  type="text"
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-2"
                />
              ))}

              <input
                type="email"
                value={formData.email}
                readOnly
                className="w-full border bg-gray-100 rounded-lg px-4 py-2"
              />

              <input
                type="text"
                value={formData.password}
                readOnly
                className="w-full border bg-gray-100 rounded-lg px-4 py-2"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  {editId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;