import { useState, useEffect } from "react";
import socket from "./lib/socket.js";
import axiosInstance from "./lib/axios.config.js";
import { useNavigate } from "react-router-dom";
import { dbStore } from "./lib/db.js";

function Home() {
  const [incidents, setIncidents] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    const getAllIncidents = async () => {
      try {
        const res = await axiosInstance.get("/incidents");
        const data = res.data;
        setIncidents(data.incidents);
      } catch (error) {
        console.error("Error fetching incidents:", error);
      }
    };

    getAllIncidents();
  }, []);

  useEffect(() => {
    socket.on("incidentCreated", (newIncident) => {
      setIncidents((prev) => [newIncident, ...prev]);
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

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const handlePriorityFilter = (e) => {
    setPriorityFilter(e.target.value);
  };

  const filteredIncidents = incidents.filter((item) => {
    const statusMatch = statusFilter === "All" || item.status === statusFilter;

    const priorityMatch =
      priorityFilter === "All" || item.priority === priorityFilter;

    return statusMatch && priorityMatch;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="">Incidents</h2>

      <div style={{ marginBottom: "10px" }}>
        {/* Status Filter */}
        <select value={statusFilter} onChange={handleStatusFilter}>
          <option value="All">All Status</option>
          <option value="active">Active</option>
          <option value="resolved">Resolved</option>
        </select>

        {/* Priority Filter */}
        <select value={priorityFilter} onChange={handlePriorityFilter}>
          <option value="All">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* incidents rendering  */}
      {filteredIncidents.length === 0 ? (
        <p>No incidents found</p>
      ) : (
        filteredIncidents.map((incident, index) => (
          <div
            key={incident._id || index}
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
      <div className="flex gap-2">
        <button
          onClick={dbStore}
          className="bg-purple-600 text-white p-2 rounded mb-4"
        >
          Seed DB
        </button>
        <button className="p-2 rounded" onClick={() => navigate("/report")}>
          Report Incident
        </button>
      </div>
    </div>
  );
}

export default Home;
