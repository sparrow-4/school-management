import React, { useState, useEffect } from "react";
import { UploadCloud } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminSettings = () => {
  const navigate = useNavigate();

  const storedAdmin =
    JSON.parse(localStorage.getItem("loggedAdmin")) || {
      name: "Admin User",
      email: "admin@system.com",
      role: "System Administrator",
      profileImage: null,
    };

  const [formData, setFormData] = useState(storedAdmin);
  const [preview, setPreview] = useState(storedAdmin.profileImage);

  /* ================= IMAGE CHANGE ================= */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
      setFormData((prev) => ({
        ...prev,
        profileImage: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  /* ================= INPUT CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= SAVE ================= */
  const handleSave = () => {
    localStorage.setItem("loggedAdmin", JSON.stringify(formData));
    alert("Profile Updated Successfully");
  };

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("session_active");
    localStorage.removeItem("loggedAdmin");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-10">

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 space-y-10">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Admin Settings
          </h1>
          <p className="text-slate-500 mt-1">
            Manage your profile and system preferences
          </p>
        </div>

        {/* PROFILE SECTION */}
        <div className="flex flex-col md:flex-row gap-10">

          {/* LEFT - PROFILE IMAGE */}
          <div className="flex flex-col items-center space-y-4">

            <img
              src={
                preview ||
                `https://ui-avatars.com/api/?name=${formData.name}&background=0f172a&color=fff`
              }
              alt="profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-slate-200 shadow-md"
            />

            <label className="flex items-center gap-2 cursor-pointer bg-slate-100 px-4 py-2 rounded-xl hover:bg-slate-200 transition">
              <UploadCloud size={18} />
              Change Photo
              <input
                type="file"
                accept=".png,.jpg,.jpeg"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>

          </div>

          {/* RIGHT - FORM */}
          <div className="flex-1 space-y-6">

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Role
              </label>
              <input
                type="text"
                value={formData.role}
                readOnly
                className="w-full border bg-slate-100 px-4 py-3 rounded-xl"
              />
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">

              <button
                onClick={handleSave}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition shadow-md"
              >
                Save Changes
              </button>

              <button
                onClick={handleLogout}
                className="flex-1 border border-red-500 text-red-600 py-3 rounded-xl hover:bg-red-50 transition"
              >
                Logout
              </button>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminSettings;