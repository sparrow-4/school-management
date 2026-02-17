import React from "react";

const Header = () => {
  return (
    <div class="relative overflow-hidden bg-whitept-16 pb-20 lg:pt-24 lg:pb-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="text-4xl md:text-6xl font-black text-slate-900  leading-tight mb-6">
            College Event Portal
          </h1>
          <p class="text-lg md:text-xl text-slate-700 mb-10 leading-relaxed">
            Submit and manage college events easily. From technical hackathons
            to cultural fests, stay updated with everything happening on campus.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="bg-primary text-black px-8 py-4 rounded-xl text-lg font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform  hover:bg-blue-600 hover:text-amber-50 ">
              View Events
            </button>
            <button class="bg-primary text-black px-8 py-4 rounded-xl text-lg font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform  hover:bg-blue-600 hover:text-amber-50 ">
              Submit Event
            </button>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Header;
