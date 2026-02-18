import React from "react";
import { FaCalendarAlt, FaUser, FaMapMarkerAlt } from "react-icons/fa";

const EventCard = ({ event }) => {
  
    
  return (
    <div className="group bg-white  rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-slate-100">

      <div className="aspect-video relative overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className={`${event.categoryColor} text-white text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full`}>
            {event.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-1">
          {event.title}
        </h3>

        <div className="space-y-2 mb-6 text-slate-500 text-sm">
          <div className="flex items-center gap-2">
            <FaCalendarAlt />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaUser />
            <span>{event.organizer}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt />
            <span>{event.location}</span>
          </div>
        </div>

        <button className="w-full py-3 rounded-xl border-2 border-blue-200 text-blue-600 font-bold hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
          View Details
        </button>
      </div>
    </div>
  );
};

export default EventCard;
