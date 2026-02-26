import { useEvents } from "../../../context/EventContext";
import { useState } from "react";

function StudentDashboard() {
  const { events, updateEvent } = useEvents();
  const loggedStudent = JSON.parse(localStorage.getItem("loggedStudent"));

  const [editId, setEditId] = useState(null);
  const [editedData, setEditedData] = useState({});

  if (!loggedStudent) return null;

  const studentEvents = events.filter(
    (e) => e.studentId === loggedStudent.id
  );

  const pendingEvents = studentEvents.filter(
    (e) => e.status === "pending"
  );

  const approvedEvents = studentEvents.filter(
    (e) => e.status === "approved"
  );

  const rejectedEvents = studentEvents.filter(
    (e) => e.status === "rejected"
  );

  const recentEvents = [...studentEvents]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  /* ================= EDIT LOGIC ================= */

  const handleEdit = (event) => {
    setEditId(event.id);
    setEditedData(event);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setEditedData((prev) => ({
        ...prev,
        poster: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const today = new Date();
    const selectedDate = new Date(editedData.date);
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      alert("Past dates are not allowed.");
      return;
    }

    updateEvent({
      ...editedData,
      status: "pending", // reset to pending after edit
    });

    setEditId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-10 space-y-12">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Welcome back, {loggedStudent.name}
        </h1>
        <p className="text-slate-500 mt-1">
          Track and manage your event submissions
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard title="Pending" value={pendingEvents.length} color="yellow" />
        <StatCard title="Approved" value={approvedEvents.length} color="green" />
        <StatCard title="Rejected" value={rejectedEvents.length} color="red" />
      </div>

      {/* RECENT EVENTS */}
      <div>
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">
          Recent Activity
        </h2>

        {recentEvents.length === 0 ? (
          <p className="text-slate-400">No events submitted yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {recentEvents.map((event) => (
              <div
                key={event.id}
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

                  {editId === event.id ? (
                    <>
                      <input
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        onChange={handleImageChange}
                        className="w-full border p-2 rounded"
                      />

                      <input
                        type="text"
                        name="title"
                        value={editedData.title}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                      />

                      <input
                        type="date"
                        name="date"
                        value={editedData.date}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                      />

                      <textarea
                        name="description"
                        value={editedData.description}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                      />

                      <div className="flex gap-2">
                        <button
                          onClick={handleSave}
                          className="flex-1 bg-green-600 text-white py-2 rounded-xl"
                        >
                          Save
                        </button>

                        <button
                          onClick={() => setEditId(null)}
                          className="flex-1 bg-gray-400 text-white py-2 rounded-xl"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg font-bold text-slate-800">
                        {event.title}
                      </h3>

                      <p className="text-sm text-slate-500">
                        📅 {event.date}
                      </p>

                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                          event.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : event.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {event.status.toUpperCase()}
                      </span>

                      {event.status === "pending" && (
                        <button
                          onClick={() => handleEdit(event)}
                          className="mt-3 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
                        >
                          Edit
                        </button>
                      )}
                    </>
                  )}

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

/* ================= STAT CARD ================= */

function StatCard({ title, value, color }) {
  const colors = {
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-700",
    green: "bg-green-50 border-green-200 text-green-700",
    red: "bg-red-50 border-red-200 text-red-700",
  };

  return (
    <div className={`border rounded-2xl p-6 shadow-sm ${colors[color]}`}>
      <p className="text-sm font-medium">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}

export default StudentDashboard;