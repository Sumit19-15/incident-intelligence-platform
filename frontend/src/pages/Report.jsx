import { useState } from "react";
import axiosInstance from "../services/axios.config";
// 1. Added icon imports
import {
  AlertTriangle,
  FileText,
  MapPin,
  Shield,
  Activity,
  Send,
  Info,
} from "lucide-react";

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

    // Validation logic (keeping your existing logic)
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

      await axiosInstance.post("/incidents/report", requestBody);
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
      setError("Failed to submit incident");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-2xl border border-gray-100">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="bg-orange-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="text-orange-600 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Report New Incident
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Provide accurate details for faster emergency response
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center gap-3 rounded-r-lg">
            <Info size={20} />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handelFormSubmit} className="space-y-5">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Incident Title
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handelInputChange}
                placeholder="e.g., Car breakdown on Main St"
                className="w-full border border-gray-200 rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-gray-50/50"
              />
            </div>
          </div>

          {/* Description - Changed to Textarea */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Description
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <Info className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                name="description"
                rows="3"
                value={formData.description}
                onChange={handelInputChange}
                placeholder="Describe the situation in detail..."
                className="w-full border border-gray-200 rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-gray-50/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Type Select */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Incident Type
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Activity className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handelInputChange}
                  className="w-full border border-gray-200 rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-gray-50/50 appearance-none"
                >
                  <option value="">Select Type</option>
                  <option value="theft">Theft</option>
                  <option value="fire">Fire</option>
                  <option value="accident">Accident</option>
                </select>
              </div>
            </div>

            {/* Priority Select */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Priority Level
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Shield className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handelInputChange}
                  className="w-full border border-gray-200 rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-gray-50/50 appearance-none"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
            </div>
          </div>

          {/* Coordinates Row */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Location Coordinates
            </label>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="lat"
                  type="number"
                  step="any"
                  value={formData.lat}
                  onChange={handelInputChange}
                  placeholder="Latitude"
                  className="w-full border border-gray-200 rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-gray-50/50"
                />
              </div>

              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="lng"
                  type="number"
                  step="any"
                  value={formData.lng}
                  onChange={handelInputChange}
                  placeholder="Longitude"
                  className="w-full border border-gray-200 rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-gray-50/50"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all transform active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send size={20} />
                  <span>Submit Incident Report</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default IncidentForm;
