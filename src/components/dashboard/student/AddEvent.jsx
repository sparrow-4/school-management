import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { useEvents } from "../../../context/EventContext";

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
  const [errors, setErrors] = useState({});

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
        setPreview(reader.result);
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

    const result = addEvent({
      ...formData,
      poster: preview,
    });

    if (!result.success) {
      setErrors(result.errors);
      return;
    }

    alert("Event Submitted Successfully!");

    setFormData({
      title: "",
      description: "",
      date: "",
      category: "Academic",
      poster: null,
    });

    setPreview(null);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-full bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Organize a New Event
        </h2>
        <h1 className="pb-2 text-gray-400">
          Fill in the detials to submit your event proposal for approval
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h1 className="pb-1 font-medium text-gray-700">Event Title</h1>
            <input
              type="text"
              name="title"
              placeholder="Event Title"
              className="w-full border px-4 py-3 rounded-lg"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          <div>
            <h1 className="pb-1 font-medium text-gray-700">Description</h1>
            <textarea
              name="description"
              placeholder="Description"
              className="w-full border px-4 py-3 rounded-lg"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h1 className="pb-1 font-medium text-gray-700">Date</h1>
              <input
                type="date"
                name="date"
                className="w-full border px-4 py-3 rounded-lg"
                value={formData.date}
                onChange={handleChange}
              />
              {errors.date && (
                <p className="text-red-500 text-sm">{errors.date}</p>
              )}
            </div>

            <div>
              <h1 className="pb-1 font-medium text-gray-700">Category</h1>
              <select
                name="category"
                className="w-full  border px-4 py-3 rounded-lg"
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

          <div>
            <h1 className="pb-1 font-medium text-gray-700">Upload Poster</h1>
            <label className="flex flex-col items-center border-2 border-dashed p-6 rounded-lg cursor-pointer">
              <UploadCloud className="w-8 h-8 mb-2" />
              Upload Poster
              <input
                type="file"
                name="poster"
                accept=".png,.jpg,.jpeg"
                className="hidden"
                onChange={handleChange}
              />
            </label>

            {errors.poster && (
              <p className="text-red-500 text-sm">{errors.poster}</p>
            )}

            {preview && (
              <img
                src={preview}
                className="w-40 h-40 mt-3 rounded-lg"
                alt="preview"
              />
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg"
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