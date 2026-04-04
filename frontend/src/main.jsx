import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "leaflet/dist/leaflet.css";
import { BrowserRouter } from "react-router";
import IncidentForm from "./pages/IncidentForm.jsx";
import MapView from "./Components/MapView.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <MapView></MapView>
      <App />
      <IncidentForm></IncidentForm>
    </BrowserRouter>
  </StrictMode>,
);
