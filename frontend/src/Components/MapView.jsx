import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
delete L.Icon.Default.prototype._getIconUrl;

const createCustomIcon = (type, isSelected) => {
  const colors = {
    fire: "#ef4444", // Red
    theft: "#f59e0b", // Amber
    accident: "#3b82f6", // Blue
    default: "#6b7280", // Gray
  };
  const color = colors[type] || colors.default;

  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        background-color: ${color};
        width: ${isSelected ? "18px" : "14px"};
        height: ${isSelected ? "18px" : "14px"};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 0 15px ${color};
        transition: all 0.3s ease;
      "></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

function ChangeView({ center }) {
  const map = useMap();
  if (center) map.flyTo(center, 15, { duration: 1.5 });
  return null;
}

function MapView({ filteredData, activeId, setActiveId }) {
  const [selectedPos, setSelectedPos] = useState(null);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      {/* The Circular Wrapper */}
      <div className="w-full aspect-square max-w-[500px] rounded-full overflow-hidden border-8 border-white shadow-2xl relative ring-4 ring-blue-500/20 animate-pulse-slow">
        <MapContainer
          center={[28.6139, 77.209]}
          zoom={12}
          zoomControl={false}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />

          <ChangeView center={selectedPos} />

          {filteredData.map((incident) => (
            <Marker
              key={incident._id}
              position={[incident.location.lat, incident.location.lng]}
              icon={createCustomIcon(incident.type, activeId === incident._id)}
              eventHandlers={{
                click: () => {
                  setSelectedPos([
                    incident.location.lat,
                    incident.location.lng,
                  ]);
                  setActiveId(incident._id);
                },
              }}
            >
              <Popup>
                <div className="p-1">
                  <p className="font-bold text-blue-600 uppercase text-[10px]">
                    {incident.type}
                  </p>
                  <p className="font-semibold text-gray-800">
                    {incident.title}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapView;
