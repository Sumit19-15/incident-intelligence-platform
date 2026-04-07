import { create } from "zustand";
import axiosInstance from "../services/axios.config";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || "",
  isAuthenticated: false,
  isLoginLoading: false,
  isRegisterLoading: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      console.log(res.data);
      set({ user: res.data, isAuthenticated: true });
    } catch (error) {
      set({ user: null, isAuthenticated: false, token: "" });
      localStorage.removeItem("token");
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  login: async (data) => {
    try {
      set({ isLoginLoading: true });
      const res = await axiosInstance.post("/auth/login", data);

      if (res.data.success) {
        set({
          user: res.data.user,
          token: res.data.token,
          isAuthenticated: true,
        });
        localStorage.setItem("token", res.data.token);
        toast.success(`Welcome back, ${res.data.user.name}!`);
        return true;
      }
      return false;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      return false;
    } finally {
      set({ isLoginLoading: false });
    }
  },

  register: async (data) => {
    try {
      set({ isRegisterLoading: true });
      const res = await axiosInstance.post("/auth/register", data);

      if (res.data.success) {
        set({
          user: res.data.user,
          token: res.data.token,
          isAuthenticated: true,
        });
        localStorage.setItem("token", res.data.token);
        toast.success("Account created successfully!");
        return true;
      }
      return false;
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      return false;
    } finally {
      set({ isRegisterLoading: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ user: null, token: "", isAuthenticated: false });
      localStorage.removeItem("token");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed", error);
      set({ user: null, token: "", isAuthenticated: false });
      localStorage.removeItem("token");
    }
  },
}));
