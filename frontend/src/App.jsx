import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import LoginPage from "./pages/Login.jsx";
import RegisterPage from "./pages/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Report from "./pages/Report.jsx";
import { useEffect } from "react";
import { useAuthStore } from "./stores/useAuthStore.js";
import { Toaster } from "react-hot-toast";
import PageLoader from "./components/PageLoader.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  const { checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <PageLoader></PageLoader>;
  }
  return (
    <div className="min-h-screen bg-grey-100">
      {/* other bg things after forming the ui bg color and other things  */}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/report"
          element={
            <ProtectedRoute>
              <Report />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
