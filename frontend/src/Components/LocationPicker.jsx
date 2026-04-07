import { useEffect, useRef, useMemo } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function InitialView({ center }) {
  const map = useMap ? null : null;
  return null;
}

function DraggableMarker({ lat, lng, onLocationChange }) {
  const markerRef = useRef(null);

  useMapEvents({
    click(e) {
      onLocationChange(e.latlng.lat, e.latlng.lng);
    },
  });

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const { lat, lng } = marker.getLatLng();
          onLocationChange(lat, lng);
        }
      },
    }),
    [onLocationChange],
  );

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={[lat, lng]}
      ref={markerRef}
    />
  );
}

function LocationPicker({ lat, lng, onLocationChange }) {
  return (
    <div className="relative h-full w-full min-h-[300px] lg:min-h-0">
      <MapContainer center={[lat, lng]} zoom={15} className="h-full w-full">
        <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
        <DraggableMarker
          lat={lat}
          lng={lng}
          onLocationChange={onLocationChange}
        />
      </MapContainer>

      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[1000] bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow text-[10px] font-semibold text-gray-500 uppercase tracking-wider border border-gray-100 pointer-events-none">
        Drag pin · Click to reposition
      </div>
    </div>
  );
}

export default LocationPicker;
