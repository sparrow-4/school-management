import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const initialFormState = {
  name: "",
  dob: "",
  section: "",
  roll: "",
  gender: "",
  address: "",
  email: "",
  password: "",
};

const AddStudents = () => {
  const loggedTeacher = JSON.parse(localStorage.getItem("loggedTeacher"));

  if (!loggedTeacher?.isHod) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl font-semibold">
        Access Denied — Only HOD can manage students.
      </div>
    );
  }

  const departmentClass = loggedTeacher.department;

  const [showForm, setShowForm] = useState(false);
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students");
    return saved ? JSON.parse(saved) : [];
  });

  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  /* ================= UNIQUE ROLL GENERATOR ================= */
  const generateRollNumber = () => {
    const departmentCode = departmentClass
      .replace(/\s+/g, "")
      .toUpperCase()
      .slice(0, 3); // max 3 letters

    const departmentStudents = students.filter(
      (s) => s.className === departmentClass
    );

    const existingNumbers = departmentStudents.map((s) => {
      const numberPart = s.roll.replace(`EDS${departmentCode}`, "");
      return parseInt(numberPart, 10);
    });

    const maxNumber = existingNumbers.length
      ? Math.max(...existingNumbers)
      : 0;

    const nextNumber = maxNumber + 1;

    return `EDS${departmentCode}${String(nextNumber).padStart(3, "0")}`;
  };

  /* ================= AGE CALCULATOR ================= */
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const diff = Date.now() - birthDate.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    const today = new Date();
    const birthDate = new Date(formData.dob);

    if (birthDate > today) {
     toast.error("Date of birth cannot be in the future.");
      return;
    }

    if (calculateAge(formData.dob) < 15) {
  toast.error("Student must be at least 15 years old.");
  return;
}

    let finalRoll = formData.roll;

    // Generate roll only for new student
    if (!editId) {
      finalRoll = generateRollNumber();
    }

    const cleanName = formData.name
      .toLowerCase()
      .replace(/\s+/g, "");

    const finalEmail = `${cleanName}${finalRoll}@edueventschool.com`;
    const finalPassword = `${cleanName}!${finalRoll}`;

    const emailExists = students.some(
      (s) =>
        s.email.toLowerCase().trim() ===
          finalEmail.toLowerCase().trim() &&
        s.id !== editId
    );

    if (emailExists) {
    toast.error("Student already exists.");
      return;
    }

    const studentData = {
      ...formData,
      roll: finalRoll,
      email: finalEmail,
      password: finalPassword,
      className: departmentClass,
    };

    if (editId) {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === editId ? { ...s, ...studentData } : s
        )
      );
      setEditId(null);
    } else {
      setStudents((prev) => [
        ...prev,
        { ...studentData, id: Date.now() },
      ]);
    }

    setFormData(initialFormState);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const handleEdit = (student) => {
    setFormData(student);
    setEditId(student.id);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-blue-600">
          Student Management ({departmentClass})
        </h2>

        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-xl"
        >
          + Add Student
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white p-8 rounded-2xl w-full max-w-3xl">

            <h3 className="text-xl font-semibold mb-6">
              {editId ? "Update Student" : "Add Student"}
            </h3>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="border rounded-xl px-4 py-3"
              />

              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                max={new Date().toISOString().split("T")[0]}
                className="border rounded-xl px-4 py-3"
              />

              <input
                value={editId ? formData.roll : generateRollNumber()}
                readOnly
                className="border bg-gray-100 rounded-xl px-4 py-3"
              />

              <select
                name="section"
                value={formData.section}
                onChange={handleChange}
                required
                className="border rounded-xl px-4 py-3"
              >
                <option value="">Select Year</option>
                <option value="1">1 Year</option>
                <option value="2">2 Year</option>
                <option value="3">3 Year</option>
              </select>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="border rounded-xl px-4 py-3"
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
                className="md:col-span-2 border rounded-xl px-4 py-3"
              />

              <input
                value={departmentClass}
                readOnly
                className="md:col-span-2 border bg-gray-100 rounded-xl px-4 py-3"
              />

              <input
                type="email"
                value={
                  editId
                    ? formData.email
                    : `${formData.name
                        .toLowerCase()
                        .replace(/\s+/g, "")}${generateRollNumber()}@student.edueventschool.com`
                }
                readOnly
                className="md:col-span-2 border bg-gray-100 rounded-xl px-4 py-3"
              />

              <input
                type="text"
                value={
                  editId
                    ? formData.password
                    : `${formData.name
                        .toLowerCase()
                        .replace(/\s+/g, "")}!${generateRollNumber()}`
                }
                readOnly
                className="md:col-span-2 border bg-gray-100 rounded-xl px-4 py-3"
              />

              <div className="md:col-span-2 text-right">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl"
                >
                  {editId ? "Update" : "Save"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {students
          .filter((s) => s.className === departmentClass)
          .map((student) => (
            <div
              key={student.id}
              className="bg-white p-6 rounded-2xl shadow"
            >
              <h3 className="text-lg font-semibold">
                {student.name}
              </h3>

              <p className="text-sm text-gray-500">
                {student.className} - {student.section} Year
              </p>

              <p className="text-sm mt-2">Roll: {student.roll}</p>
              <p className="text-sm">
                DOB: {new Date(student.dob).toLocaleDateString()}
              </p>
              <p className="text-sm">
                Age: {calculateAge(student.dob)}
              </p>
              <p className="text-sm">Email: {student.email}</p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleEdit(student)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-xl"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(student.id)}
                  className="flex-1 bg-gray-200 py-2 rounded-xl"
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