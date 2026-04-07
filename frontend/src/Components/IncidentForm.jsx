import { useRef } from "react";
import { AlertTriangle, UploadCloud, Navigation, Send, X } from "lucide-react";

function IncidentForm({
  formData,
  setFormData,
  imagePreview,
  setImagePreview,
  onSubmit,
  loading,
}) {
  const fileInputRef = useRef(null);

  const handleImageChange = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-8 md:p-10 space-y-6 overflow-y-auto max-h-screen">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="bg-orange-100 text-orange-600 p-1.5 rounded-lg">
            <AlertTriangle size={18} />
          </span>
          <h2 className="text-xl font-semibold text-gray-800 tracking-tight">
            Report an Incident
          </h2>
        </div>
        <p className="text-sm text-gray-400 pl-1">
          Fill in the details below and confirm the location on the map.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {/* Title */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Title
          </label>
          <input
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition"
            placeholder="e.g. Vehicle collision on Main St."
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Description
          </label>
          <textarea
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition resize-none h-24"
            placeholder="Briefly describe what happened..."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </label>
            <select
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              required
            >
              <option value="">Select type</option>
              <option value="fire">🔥 Fire</option>
              <option value="theft">🚨 Theft</option>
              <option value="accident">💥 Accident</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Priority
            </label>
            <select
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition"
              value={formData.priority}
              onChange={(e) =>
                setFormData({ ...formData, priority: e.target.value })
              }
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Photo Evidence
          </label>
          <div
            className="relative border-2 border-dashed border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:border-blue-300 hover:bg-blue-50/40 transition-all group"
            onClick={() => fileInputRef.current.click()}
          >
            {imagePreview ? (
              <div className="relative h-36 w-full">
                <img
                  src={imagePreview}
                  className="h-full w-full object-cover rounded-lg"
                  alt="Preview"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setImagePreview(null);
                    setFormData((p) => ({ ...p, image: null }));
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow"
                >
                  <X size={13} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center text-gray-400 py-5 gap-2">
                <UploadCloud
                  size={26}
                  className="group-hover:text-blue-400 transition-colors"
                />
                <span className="text-xs font-medium group-hover:text-blue-500 transition-colors">
                  Click to upload a photo
                </span>
                <span className="text-[10px] text-gray-300">
                  PNG, JPG up to 10MB
                </span>
              </div>
            )}
            <input
              type="file"
              hidden
              ref={fileInputRef}
              accept="image/*"
              onChange={(e) => handleImageChange(e.target.files[0])}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-4 py-2.5">
          <Navigation size={13} className="text-blue-400 shrink-0" />
          <span className="text-[11px] font-mono text-blue-600">
            {formData.lat.toFixed(6)}, {formData.lng.toFixed(6)}
          </span>
          <span className="ml-auto text-[10px] text-blue-300 font-medium">
            Drag pin on map to adjust
          </span>
        </div>

        <button
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold py-3 rounded-xl transition-colors shadow-md shadow-blue-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Send size={15} />
              Submit Report
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default IncidentForm;
