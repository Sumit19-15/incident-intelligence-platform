import { useState } from "react";
import axiosInstance from "../lib/axios.config";

function IncidentForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    priority: "low",
    lng: "",
    lat: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handelInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handelFormSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;

    if (
      !formData.title ||
      !formData.description ||
      !formData.type ||
      !formData.lat ||
      !formData.lng
    ) {
      setError("All fields are required");
      return;
    }

    const allowedTypes = ["accident", "fire", "theft"];
    if (!allowedTypes.includes(formData.type)) {
      setError("Invalid incident type");
      return;
    }

    if (isNaN(formData.lat) || isNaN(formData.lng)) {
      setError("Latitude and Longitude must be valid numbers");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const requestBody = {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        location: {
          lat: Number(formData.lat),
          lng: Number(formData.lng),
        },
        priority: formData.priority,
      };

      const res = await axiosInstance.post("/incidents/report", requestBody);
      console.log(res.data.message);

      alert("New incident is reported.");

      setFormData({
        title: "",
        description: "",
        type: "",
        priority: "low",
        lat: "",
        lng: "",
      });
    } catch (error) {
      console.error(
        "IncidentForm submit failed.",
        error.response?.data || error.message,
      );
      setError("Failed to submit incident");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-xl">
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <h2 className="text-xl font-semibold mb-4">Report Incident</h2>
        <form onSubmit={handelFormSubmit}>
          <div className="mb-4">
            <label
              className="block text-md font-medium text-gray-700"
              htmlFor="incidentForm-title"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handelInputChange}
              id="incidentForm-title"
              placeholder="Enter Title"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-md font-medium text-gray-700"
              htmlFor="incidentForm-description"
            >
              Description
            </label>
            <input
              type="textarea"
              value={formData.description}
              onChange={handelInputChange}
              placeholder="Description"
              name="description"
              id="incidentForm-description"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4 ">
            <select
              id="incidentForm-type"
              name="type"
              value={formData.type}
              onChange={handelInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Type</option>
              <option value="theft">Theft</option>
              <option value="fire">Fire</option>
              <option value="accident">Accident</option>
            </select>
          </div>

          <div className="mb-4">
            <select
              id="incidentForm-priority"
              name="priority"
              value={formData.priority}
              onChange={handelInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className=" flex gap-2 mb-4 ">
            <input
              name="lat"
              type="number"
              value={formData.lat}
              onChange={handelInputChange}
              placeholder="Latitude"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="lng"
              type="number"
              value={formData.lng}
              onChange={handelInputChange}
              placeholder="Longitude"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white text-xl py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default IncidentForm;
