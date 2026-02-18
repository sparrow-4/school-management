

import React from "react";

import EventCard from "./EventCard";
import { events } from "../../constants/Index";

const Events = () => {
  return (
    <div className="bg-gray-100 w-full ">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ">

      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 ">
            Upcoming Events
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Discover and participate in college activities
          </p>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

    </main>
    </div>
  );
};

export default Events;
