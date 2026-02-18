import React from 'react'
import { MdOutlineSchool } from 'react-icons/md'
import { LuBadgeHelp } from "react-icons/lu";

const Navbar = () => {
  return (
    <div>
        <header className="w-full p-4 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-black/20 sticky top-0 z-50">
<div className="flex items-center gap-2">
<div className="bg-primary p-1.5 rounded-lg flex items-center justify-center">
<div className="bg-blue-600 p-2 rounded-lg">
              <MdOutlineSchool className="text-white lg:text-3xl text-xl" />
            </div>
</div>
<span className="font-bold text-slate-900 lg:text-3xl text-xl  tracking-tight">EduEvents</span>
</div>
<button className="text-slate-500 hover:text-blue-600 transition-colors">
<span className="lg:text-3xl text-xl cursor-pointer"><LuBadgeHelp /></span>
</button>
</header>
    </div>
  )
}

export default Navbar