import React, { useState, useMemo } from "react";
import { useEvents } from "../../../context/EventContext";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const ReviewEvents = () => {
  const { events, updateEventStatus } = useEvents();
  const [activeTab, setActiveTab] = useState("all");

  // ✅ DECLARE FIRST
  const loggedTeacher = JSON.parse(
    localStorage.getItem("loggedTeacher")
  );

  const isHod = loggedTeacher?.isHod;

  // ✅ ONLY EVENTS FROM SAME DEPARTMENT
  const departmentEvents = useMemo(() => {
    if (!loggedTeacher?.department) return [];
    return events.filter(
      (event) =>
        event.department === loggedTeacher.department
    );
  }, [events, loggedTeacher]);

  // ✅ FILTER BY TAB
  const filteredEvents =
    activeTab === "all"
      ? departmentEvents
      : departmentEvents.filter(
          (event) => event.status === activeTab
        );

  const handleApprove = (id) => {
    updateEventStatus(id, "approved");
    toast.success("Event Approved Successfully 🎉");
  };

  const handleReject = (id) => {
    updateEventStatus(id, "rejected");
    toast.error("Event Rejected ❌");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8 space-y-8">

      <h1 className="text-3xl font-bold text-slate-800">
        Event Review Panel
      </h1>

      {/* TABS */}
      <div className="flex gap-6 border-b">
        {["all", "pending", "approved", "rejected"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 capitalize font-medium transition ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* EVENTS */}
      {filteredEvents.length === 0 ? (
        <p className="text-gray-400 text-center py-10">
          No events found
        </p>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                {event.poster && (
                  <img
                    src={event.poster}
                    alt={event.title}
                    className="w-full h-44 object-cover"
                  />
                )}

                <div className="p-5 space-y-3">

                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                      event.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : event.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {event.status.toUpperCase()}
                  </span>

                  <h3 className="text-lg font-bold text-slate-800">
                    {event.title}
                  </h3>

                  <p className="text-sm text-slate-500">
                    📅 {event.date}
                  </p>

                  <p className="text-sm text-slate-600 line-clamp-3">
                    {event.description}
                  </p>

                  {/* ONLY HOD CAN APPROVE */}
                  {isHod && event.status === "pending" && (
                    <div className="flex gap-3 pt-3">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => handleApprove(event.id)}
                        className="flex-1 bg-green-600 text-white py-2 rounded-xl"
                      >
                        Approve
                      </motion.button>

                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => handleReject(event.id)}
                        className="flex-1 border border-red-500 text-red-500 py-2 rounded-xl"
                      >
                        Reject
                      </motion.button>
                    </div>
                  )}

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default ReviewEvents;