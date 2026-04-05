import React from "react";
import { Navigate, Routes, Route } from "react-router";
import Home from "./Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import IncidentForm from "./pages/IncidentForm";

function App() {
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
