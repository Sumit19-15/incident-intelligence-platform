import { useState, useEffect } from "react";
import axios from "axios";
import socket from "./socket.js";
function App() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const getAllIncidents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/incidents");
        const data = await res.json();

        setIncidents(data.incidents);
      } catch (error) {
        console.error("Error fetching incidents:", error);
      }
    };

    getAllIncidents();
  }, []);

  useEffect(() => {
    socket.on("incidentCreated", (newIncident) => {
      setIncidents((prev) => {
        return [newIncident, ...prev];
      });
    });

    socket.on("incidentUpdated", (updatedIncident) => {
      setIncidents((prev) =>
        prev.map((item) =>
          item._id === updatedIncident._id ? updatedIncident : item,
        ),
      );
    });

    socket.on("incidentDeleted", (deletedIncident) => {
      setIncidents((prev) =>
        prev.filter((item) => item._id !== deletedIncident._id),
      );
    });

    return () => {
      socket.off("incidentCreated");
      socket.off("incidentUpdated");
      socket.off("incidentDeleted");
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Incidents</h2>

      {incidents.length === 0 ? (
        <p>No incidents found</p>
      ) : (
        incidents.map((incident) => (
          <div
            key={incident._id}
            style={{
              border: "1px solid #ccc",
              marginBottom: "10px",
              padding: "10px",
            }}
          >
            <h4>{incident.title}</h4>
            <p>Status: {incident.status}</p>
            <p>Priority: {incident.priority}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
