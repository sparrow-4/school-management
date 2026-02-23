import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { useEvents } from "../../../context/EventContext"

function AddEvent() {
  const { addEvent } = useEvents();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    category: "Academic",
    poster: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          poster: reader.result,
        }));

        setPreview(reader.result); // 🔥 ADD THIS LINE
      };

      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const eventData = {
    ...formData,
    poster: preview,
  };

  addEvent(eventData);
  alert("Event Submitted Successfully!");

  setFormData({
    title: "",
    description: "",
    date: "",
    category: "Academic",
    poster: null,
  });

  setPreview(null);
};
  

  return (
    <div className="min-h-screen  bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-full bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Organize a New Event
        </h2>
        <p className="text-gray-500 mt-1 mb-6">
          Fill in the details below to submit your event proposal for approval.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Title */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Event Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Annual Tech Symposium 2024"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              placeholder="Describe the agenda, target audience, and key highlights..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Date + Category */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Date */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Event Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="date"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.date}
                  onChange={handleChange}
                />

              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.category}
                onChange={handleChange}
              >
                <option>Academic</option>
                <option>Technical</option>
                <option>Cultural</option>
                <option>Sports</option>
              </select>
            </div>
          </div>

          {/* Upload Poster */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Upload Poster
            </label>

            <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-xl p-10 cursor-pointer hover:bg-gray-50 transition">
              <UploadCloud className="w-10 h-10 text-gray-400 mb-3" />
              <p className="text-gray-600">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-gray-400 mt-1">
                PNG, JPG or PDF (max. 5MB)
              </p>
              <input
                type="file"
                name="poster"
                accept=".png,.jpg,.jpeg,.pdf"
                className="hidden"
                onChange={handleChange}
              />
              {preview && (
                <div className="mt-4">
                  <img
                    src={preview}
                    alt="Poster Preview"
                    className="w-48 h-48 object-cover rounded-lg shadow-md"
                  />
                </div>
              )}
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              className="text-gray-600 font-medium hover:text-gray-800"
            >
              Save Draft
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Submit Proposal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEvent;