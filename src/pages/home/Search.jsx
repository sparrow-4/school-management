import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const Search = () => {
  return (
    <div className="max-w-7xl mx-auto px-4   relative z-20">
      <div className="bg-white  p-4 rounded-2xl shadow-xl border border-slate-100 -700 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <IoSearchOutline />
          </span>
          <input
            className="w-full pl-10 pr-4 py-3 bg-slate-50  border-none rounded-xl focus:ring-2 focus:ring-primary text-sm"
            placeholder="Search events, workshops, fests..."
            type="text"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          <button className="bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap">
            All
          </button>
          <button className="bg-slate-100   00 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap hover:bg-slate-200">
            Technical
          </button>
          <button className="bg-slate-100   00 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap hover:bg-slate-200">
            Cultural
          </button>
          <button className="bg-slate-100   00 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap hover:bg-slate-200">
            Sports
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
