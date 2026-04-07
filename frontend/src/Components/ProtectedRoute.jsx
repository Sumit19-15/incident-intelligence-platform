import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import toast from "react-hot-toast";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isCheckingAuth } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    if (!isCheckingAuth && !isAuthenticated) {
      toast.error("Please login to report an Incident", { id: "auth-denied" });
    }
  }, [isCheckingAuth, isAuthenticated]);

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
