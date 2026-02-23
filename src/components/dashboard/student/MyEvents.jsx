import { useState } from "react";
import { useEvents } from "../../../context/EventContext";

function MyEvents() {
  const { events, deleteEvent, updateEvent } = useEvents();

  const [editId, setEditId] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleEditClick = (event) => {
    setEditId(event.id);
    setEditedData(event);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSave = () => {
    updateEvent(editedData);
    setEditId(null);
  };

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onloadend = () => {
      setEditedData((prev) => ({
        ...prev,
        poster: reader.result, // ✅ Base64 string
      }));
    };

    reader.readAsDataURL(file);
  } else {
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6">My Events</h2>

      {events.length === 0 ? (
        <p className="text-gray-500">No events added yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {event.poster && (
                <img
                  src={event.poster}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-5">
                {editId === event.id ? (
                 <>


  {/* Change Image */}
  <input
    type="file"
    accept=".png,.jpg,.jpeg"
    onChange={handleImageChange}
    className="mb-3"
  />

  <input
    type="text"
    name="title"
    value={editedData.title}
    onChange={handleChange}
    className="w-full border p-2 rounded mb-2"
  />

  <textarea
    name="description"
    value={editedData.description}
    onChange={handleChange}
    className="w-full border p-2 rounded mb-2"
  />

  <input
    type="date"
    name="date"
    value={editedData.date}
    onChange={handleChange}
    className="w-full border p-2 rounded mb-3"
  />

  <div className="flex gap-2">
    <button
      onClick={handleSave}
      className="bg-green-600 text-white px-4 py-2 rounded text-sm"
    >
      Save
    </button>

    <button
      onClick={() => setEditId(null)}
      className="bg-gray-400 text-white px-4 py-2 rounded text-sm"
    >
      Cancel
    </button>
  </div>
</>
                ) : (
                  <>
                    <h3 className="text-xl font-bold">
                      {event.title}
                    </h3>

                    <p className="text-gray-500 text-sm mt-2 font-bold">
                      {event.description}
                    </p>

                    <div className="flex justify-between items-center mt-3">
                      <div className="text-sm text-gray-600 font-medium">
                        <p>📅 {event.date}</p>
                        <p>🏷 {event.category}</p>
                      </div>

                      <div>
                        <button
                          onClick={() => handleEditClick(event)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteEvent(event.id)}
                          className="ml-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyEvents;