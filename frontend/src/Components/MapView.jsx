import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import axiosInstance from "../lib/axios.config";
import { useState, useEffect } from "react";
import socket from "../lib/socket.js";

function FlyToLocation({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 15, { duration: 1.5 });
    }
  }, [position, map]);

  return null;
}

function MapView() {
  const [incidents, setIncidents] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const getAllIncidents = async () => {
      try {
        const res = await axiosInstance.get("/incidents");
        setIncidents(res.data.incidents || []);
      } catch (error) {
        console.error("Error fetching incidents:", error);
      }
    };

    getAllIncidents();
  }, []);

  useEffect(() => {
    const handleCreate = (newIncident) => {
      setIncidents((prev) => [newIncident, ...prev]);
    };

    const handleUpdate = (updatedIncident) => {
      setIncidents((prev) =>
        prev.map((item) =>
          item._id === updatedIncident._id ? updatedIncident : item,
        ),
      );
    };

    const handleDelete = (deletedIncident) => {
      setIncidents((prev) =>
        prev.filter((item) => item._id !== deletedIncident._id),
      );
    };

    socket.on("incidentCreated", handleCreate);
    socket.on("incidentUpdated", handleUpdate);
    socket.on("incidentDeleted", handleDelete);

    return () => {
      socket.off("incidentCreated", handleCreate);
      socket.off("incidentUpdated", handleUpdate);
      socket.off("incidentDeleted", handleDelete);
    };
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          console.log("Location access denied", err);
        },
      );
    }
  }, []);

  return (
    <div className="h-[400px]" id="map">
      <MapContainer
        center={[28.6139, 77.209]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {selectedPosition && <FlyToLocation position={selectedPosition} />}

        {incidents.map((incident) => {
          if (!incident.location?.lat || !incident.location?.lng) return null;

          return (
            <Marker
              key={incident._id}
              position={[incident.location.lat, incident.location.lng]}
              eventHandlers={{
                click: () => {
                  setSelectedPosition([
                    incident.location.lat,
                    incident.location.lng,
                  ]);
                },
                mouseover: (e) => {
                  e.target.openPopup();
                },
                mouseout: (e) => {
                  e.target.closePopup();
                },
              }}
            >
              <Popup>
                <strong>{incident.title}</strong> <br />
                Status: {incident.status}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default MapView;
