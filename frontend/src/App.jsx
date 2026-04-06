import { Routes, Route } from "react-router";
import Home from "./pages/Home.jsx";
import LoginPage from "./pages/Login.jsx";
import RegisterPage from "./pages/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import IncidentForm from "./pages/Report.jsx";
import { useEffect } from "react";
import { useAuthStore } from "./stores/useAuthStore.js";

function App() {
  const { checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-600"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-grey-100">
      {/* other bg things after forming the ui bg color and other things  */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/report"
          element={
            <ProtectedRoute>
              <IncidentForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
