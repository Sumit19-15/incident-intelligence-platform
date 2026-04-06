import { create } from "zustand";
import axiosInstance from "../services/axios.config";
import socket from "../services/socket";

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
    } finally {
      set({ isLoading: false });
    }
  },

  // Centralized Socket Listeners
  subscribeToEvents: () => {
    socket.on("incidentCreated", (newIncident) => {
      set((state) => ({ incidents: [newIncident, ...state.incidents] }));
    });

    socket.on("incidentUpdated", (updated) => {
      set((state) => ({
        incidents: state.incidents.map((i) =>
          i._id === updated._id ? updated : i,
        ),
      }));
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
}));
