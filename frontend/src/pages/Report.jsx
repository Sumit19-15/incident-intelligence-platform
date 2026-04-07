import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useIncidentStore } from "../stores/useIncidentStore";
import IncidentForm from "../components/IncidentForm";
import LocationPicker from "../components/LocationPicker";
import toast from "react-hot-toast";

function Report() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    priority: "low",
    lng: 77.209,
    lat: 28.6139,
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const locationFetched = useRef(false);

  const navigate = useNavigate();
  const { reportIncident } = useIncidentStore();

  useEffect(() => {
    if (locationFetched.current) return;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          locationFetched.current = true;
          setFormData((prev) => ({
            ...prev,
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }));
        },
        () => toast.error("Location denied. Pin manually."),
      );
    }
  }, []);

  const handleLocationUpdate = (lat, lng) => {
    setFormData((prev) => ({ ...prev, lat, lng }));
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const success = await reportIncident({
        ...formData,
        location: { lat: formData.lat, lng: formData.lng },
      });
      if (success) navigate("/");
    } catch (err) {
      toast.error("Failed to submit report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6fb] flex items-center justify-center p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl flex flex-col lg:flex-row overflow-hidden border border-gray-100">
        <div className="lg:w-[65%] w-full">
          <IncidentForm
            formData={formData}
            setFormData={setFormData}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            onSubmit={handleFinalSubmit}
            loading={loading}
          />
        </div>

        <div className="lg:w-[35%] w-full h-[300px] lg:h-auto">
          <LocationPicker
            lat={formData.lat}
            lng={formData.lng}
            onLocationChange={handleLocationUpdate}
          />
        </div>
      </div>
    </div>
  );
}

export default Report;
