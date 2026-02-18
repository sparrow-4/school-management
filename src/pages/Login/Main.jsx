import React, { useState } from 'react'
import { MdOutlineBadge, MdOutlineLogin, MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Main = () => {




    const { login, error } = useAuth();
    const navigate = useNavigate();

    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");




    const [showPassword, setShowPassword] = useState(false);
    const footerLinks = [
        "Privacy Policy",
        "Terms of Service",
        "Support"
    ];
    const roles = [
        { value: "student", label: "Student" },
        { value: "teacher", label: "Teacher" },
        { value: "admin", label: "Administrator" },

    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        if (role === "admin") {
            navigate("/otp");
        } else {
            console.log("Login normally");
        }
    };


    return (
        <div>
            <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">

                <div className="w-full max-w-md bg-white  rounded-xl shadow-xl shadow-primary/5 border border-slate-200  overflow-hidden">
                    <div className="p-8">

                        {/* headiiing */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-slate-900  tracking-tight mb-2">Welcome Back</h1>
                            <p className="text-slate-500 ">Please sign in to manage your events.</p>
                        </div>

                        {/* form for login*/}
                        <form
                            className="space-y-5"
                            onSubmit={(e) => {
                                e.preventDefault();
                                const success = login(email, password, role);
                                if (success) {
                                    navigate("/otp");
                                }
                            }}
                        >




                            {/* roole */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-slate-700 " htmlFor="role">Select Your Role</label>
                                <div className="relative">
                                    <MdOutlineBadge className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg' />
                                    <select
                                        className="w-full pl-10 pr-4 py-3 bg-black/5 rounded-xl outline-none transition-all text-slate-900 appearance-none"
                                        id="role"
                                        name="role"
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        {roles.map((role) => (
                                            <option key={role.value} value={role.value}>
                                                {role.label}
                                            </option>
                                        ))}
                                    </select>

                                </div>
                            </div>


                            {/*mail*/}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-slate-700 " htmlFor="email">College Email</label>
                                <div className="relative">
                                    <IoMailOutline className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg' />
                                    <input className="w-full pl-10 pr-4 py-3 bg-slate-50  border border-slate-200  rounded-lg focus:ring-2 focus:ring-black/10
                                     focus:border-primary outline-none transition-all text-slate-900  placeholder:text-slate-400" id="email" name="email" placeholder="e.g. student@college.edu" type="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>


                            {/* paaaaaaaswrd */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="block text-sm font-semibold text-slate-700 " htmlFor="password">Password</label>
                                    <a className="text-xs font-medium text-primary hover:underline" href="#">Forgot password?</a>
                                </div>
                                <div className="relative">

                                    <CiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-black/10 outline-none transition-all text-slate-900"
                                    />


                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        {showPassword ? (
                                            <MdOutlineVisibilityOff className="text-lg" />
                                        ) : (
                                            <MdOutlineVisibility className="text-lg" />
                                        )}
                                    </button>

                                </div>
                            </div>
                            {/* check rember */}
                            {error && (
                                <p className="text-red-500 text-sm text-center">
                                    {error}
                                </p>
                            )}
                            {/* submit */}
                            <button className="w-full bg-blue-500 hover:bg-blue-600
 hover:text-white hover:text-2xl text-black font-bold py-3.5 px-4
  rounded-lg shadow-lg shadow-blue-800 transition-all transform 
  active:scale-[0.98] flex items-center justify-center gap-2 mt-4" type="submit">
                                <span>Sign In</span>
                                <MdOutlineLogin className="ml-1 text-2xl " />
                            </button>
                        </form>
                    </div>
                    {/*card down */}
                    <div className="bg-slate-50  p-6 border-t border-slate-100  text-center">
                        <p className="text-sm text-slate-500 ">
                            Need an account? <a className="text-primary font-semibold hover:underline" href="#">Contact Administration</a>
                        </p>
                    </div>
                </div>
                {/* footer */}
                <footer className="mt-8 text-center text-slate-400">
                    <div className="flex items-center justify-center gap-4 text-xs font-medium mb-4">

                        {footerLinks.map((link, index) => (
                            <div key={index}>
                                <a
                                    href="#"
                                    className="hover:text-slate-600 transition-colors"
                                >
                                    {link}
                                </a>

                                {index !== footerLinks.length - 1 && (
                                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                )}
                            </div>
                        ))}

                    </div>

                    <p className="text-xs">
                        © 2024 College Event Management System. All rights reserved.
                    </p>
                </footer>
            </main>
        </div>
    )
}

export default Main;