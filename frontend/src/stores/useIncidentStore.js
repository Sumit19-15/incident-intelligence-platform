import { create } from "zustand";
import axiosInstance from "../services/axios.config";
import socket from "../services/socket";
import toast from "react-hot-toast";

export const useIncidentStore = create((set, get) => ({
  incidents: [],
  isLoading: false,

  fetchIncidents: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/incidents");
      set({ incidents: res.data.incidents || [] });
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load incidents");
    } finally {
      set({ isLoading: false });
    }
  },

  // Centralized Socket Listeners
  subscribeToEvents: () => {
    socket.off("incidentCreated");
    socket.off("incidentUpdated");
    socket.off("incidentDeleted");

    socket.on("incidentCreated", (newIncident) => {
      set((state) => ({ incidents: [newIncident, ...state.incidents] }));

      toast(`New ${newIncident.type} reported!`, {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    });

    socket.on("incidentUpdated", (updated) => {
      set((state) => ({
        incidents: state.incidents.map((i) =>
          i._id === updated._id ? updated : i,
        ),
      }));
      if (updated.status === "resolved") {
        toast.success(`Incident "${updated.title}" has been resolved!`);
      }
    });

    socket.on("incidentDeleted", (deleted) => {
      set((state) => ({
        incidents: state.incidents.filter((i) => i._id !== deleted._id),
      }));
    });
  },

  unsubscribeFromEvents: () => {
    socket.off("incidentCreated");
    socket.off("incidentUpdated");
    socket.off("incidentDeleted");
  },

  reportIncident: async (formData) => {
    try {
      const res = await axiosInstance.post("/incidents/report", formData);
      toast.success("Incident reported successfully!");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to report incident");
      throw error;
    }
  },
}));
