import React, { useState } from "react";

const ReviewEvents = () => {

  const [activeTab, setActiveTab] = useState("pending");

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "AI Symposium",
      date: "Oct 24, 2025",
      description:
        "A grand technical symposium featuring workshops, coding competitions and guest lectures from industry experts.",
      status: "pending",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    },
    {
      id: 2,
      title: "Blockchain Conference",
      date: "Nov 12, 2025",
      description:
        "Annual open tech meet discussing blockchain trends in fintech startups and real world solutions.",
      status: "approved",
      image:
        "https://images.unsplash.com/photo-1640161704729-cbe966a08476",
    },
    {
      id: 3,
      title: "Hackathon",
      date: "Dec 5, 2025",
      description:
        "24 hour national level coding hackathon conducted by final year students association.",
      status: "rejected",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setEvents(prev =>
      prev.map(event =>
        event.id === id ? { ...event, status: newStatus } : event
      )
    );
  };

  const filteredEvents =
    activeTab === "all"
      ? events
      : events.filter(event => event.status === activeTab);

  return (
    <div className="p-6 overflow-y-auto flex-1 bg-gray-100 min-h-screen">

      {/* PAGE TITLE */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Review Events
      </h2>

      {/* TABS */}
      <div className="flex gap-6 mb-6 border-b">
        {["all", "pending", "approved", "rejected"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative pb-2 capitalize font-medium transition duration-300
            ${activeTab === tab ? "text-blue-600" : "text-gray-600"}`}
          >
            {tab}
            <span
              className={`absolute left-0 bottom-0 h-[2px] w-full bg-blue-600 transform origin-left transition-transform duration-300
              ${activeTab === tab ? "scale-x-100" : "scale-x-0"}`}
            ></span>
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">

        {filteredEvents.map(event => (
          <div
            key={event.id}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden flex flex-col h-full border"
          >

            {/* IMAGE */}
            <div className="relative overflow-hidden">
              <img
                src={`${event.image}?auto=format&fit=crop&w=400&q=60`}
                alt=""
                className="w-full h-40 object-cover group-hover:scale-105 transition duration-300"
              />

              {/* STATUS BADGE */}
              <span
                className={`absolute top-3 right-3 px-3 py-1 text-[11px] rounded-full font-medium backdrop-blur
                ${
                  event.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : event.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {event.status.toUpperCase()}
              </span>
            </div>

            {/* CONTENT */}
            <div className="p-4 flex flex-col h-full">

              <h2 className="text-[15px] font-semibold text-gray-800 mb-1">
                {event.title}
              </h2>

              <p className="text-xs text-gray-400 mb-2">
                {event.date}
              </p>

              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {event.description}
              </p>

              {/* ACTIONS */}
              {event.status === "pending" && (
                <div className="flex gap-2 mt-auto pt-3 border-t">

                  <button
                    onClick={() =>
                      handleStatusChange(event.id, "approved")
                    }
                    className="w-full bg-green-600 text-white text-sm py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      handleStatusChange(event.id, "rejected")
                    }
                    className="w-full border border-red-400 text-red-500 text-sm py-2 rounded-lg hover:bg-red-50 transition"
                  >
                    Reject
                  </button>

                </div>
              )}

            </div>
          </div>
        ))}

        {filteredEvents.length === 0 && (
          <div className="text-center text-gray-400 mt-10 col-span-full">
            No events found
          </div>
        )}

      </div>
    </div>
  );
};

export default ReviewEvents;