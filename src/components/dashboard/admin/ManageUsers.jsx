
import React, { useState, useEffect } from "react";
import { HiPlus } from "react-icons/hi";
import { MdOutlineEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { MdOutlineGroups2 } from "react-icons/md";
import { MdOutlineLocalPhone } from "react-icons/md";
import { CiSearch } from "react-icons/ci";

const ManageUsers = () => {
    const [teachers, setTeachers] = useState(() => {
        const savedTeachers = localStorage.getItem("teachers");
        return savedTeachers ? JSON.parse(savedTeachers) : [];
    });
    useEffect(() => {
        localStorage.setItem("teachers", JSON.stringify(teachers));
    }, [teachers]);
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        department: "",
        phone: "",
    });                                                                                                                                                                 

    const filteredTeachers = teachers.filter((teacher) =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (teacher) => {
        setFormData({
            name: teacher.name,
            email: teacher.email,
            password: teacher.password,
            department: teacher.department,
            phone: teacher.phone,
        });

        setEditId(teacher.id);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        setTeachers((prev) => prev.filter((teacher) => teacher.id !== id));
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const toggleHod = (id) => {
        setTeachers((prev) =>
            prev.map((teacher) =>
                teacher.id === id
                    ? { ...teacher, isHod: !teacher.isHod }
                    : teacher
            )
        );
    };

    const handleAddTeacher = (e) => {
        e.preventDefault();

        if (editId !== null) {
            // EDIT EXISTING TEACHER
            setTeachers((prev) =>
                prev.map((teacher) =>
                    teacher.id === editId
                        ? { ...teacher, ...formData }
                        : teacher
                )
            );
        } else {
            // ADD NEW TEACHER
            const newTeacher = {
                ...formData,
                id: Date.now(),
                isHod: false,
            };

            setTeachers((prev) => [...prev, newTeacher]);
        }

        // Reset everything
        setEditId(null);
        setShowModal(false);

        setFormData({
            name: "",
            email: "",
            password: "",
            department: "",
            phone: "",
        });
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">

            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Teachers
                    </h1>
                    <p className="text-sm text-gray-500">
                        Manage faculty members
                    </p>
                </div>

                <div className="lg:flex-1 max-w-md relative hidden lg:block ">
                    <CiSearch className="absolute mt-3.5 ml-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name, email, or department..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-10 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                    <HiPlus />
                    Add Teacher
                </button>
            </div>

            {/* Teachers Grid */}
            {filteredTeachers.length === 0 ? (
                <div className="text-center text-gray-400 mt-24 text-lg">
                    No teachers added yet.
                </div>
            ) : (
                <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredTeachers.map((teacher) => (
                        <div
                            key={teacher.id}
                            className="group bg-white rounded-2xl shadow-sm border border-gray-200 p-6 
                   hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            {/* Top Section */}
                            <div className="flex items-center gap-4 mb-5">
                                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold">
                                    {teacher.name.charAt(0).toUpperCase()}
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide">
                                        {teacher.name}
                                    </h2>
                                  <div className="flex gap-2">
                                      <MdOutlineGroups2 className="text-xl text-blue-600" />
                                    <p className="text-sm text-gray-500">
                                        {teacher.department}
                                    </p>
                                  </div>

                                </div>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-100 mb-4"></div>

                            {/* Details */}
                            <div className="space-y-3 text-sm">

                                <div className="flex items-center gap-3 text-gray-600">
                                    <MdOutlineEmail className="text-blue-600 text-lg" />
                                    <span>{teacher.email}</span>
                                </div>

                                <div className="flex items-center gap-3 text-gray-600">
                                    <MdOutlineLocalPhone className="text-blue-600 text-lg" />
                                    <span>{teacher.phone}</span>
                                </div>

                                <div className="flex items-center   gap-3 text-gray-600">
                                    <CiLock className="text-blue-600 text-lg" />
                                    <span className="bg-gray-100 px-3 py-1 rounded-lg text-xs font-medium tracking-wider">
                                        {teacher.password}
                                    </span>
                                </div>

                                <div className="flex justify-end gap-4 mt-4">
                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => toggleHod(teacher.id)}
                                            className={`px-4 py-2 rounded-lg text-white transition ${teacher.isHod
                                                ? "bg-green-600 hover:bg-green-500"
                                                : "bg-gray-600 hover:bg-gray-700"
                                                }`}
                                        >
                                            {teacher.isHod ? "HOD ✓" : "Make HOD"}
                                        </button>
                                    </div>

                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => handleEdit(teacher)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white lg:px-4 lg:py-2 px-6 py-4.5 rounded-lg"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(teacher.id)}
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                                    >
                                        Delete
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-8 relative">

                        <h2 className="text-xl font-semibold mb-6">
                            Add Teacher
                        </h2>

                        <form onSubmit={handleAddTeacher} className="space-y-4">

                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />

                            <input
                                type="text"
                                name="department"
                                placeholder="Department"
                                value={formData.department}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />

                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                                >
                                    Add
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