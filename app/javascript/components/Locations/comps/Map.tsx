import React, { useState, useMemo } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

function toNum(v?: number | string | null): number | null {
  if (v === null || v === undefined || v === "") return null;
  const n = typeof v === "number" ? v : parseFloat(v);
  return Number.isFinite(n) ? n : null;
}

export default function Map({ location }: any) {
  const [lat, setLat] = useState<number | null>(toNum(location?.latitude));
  const [lng, setLng] = useState<number | null>(toNum(location?.longitude));
  const center = useMemo(
    () => ({ lat: lat ?? 9.9281, lng: lng ?? -84.0907 }),
    [lat, lng]
  );
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GOOGLE_API_KEY || "",
    libraries: ["places"],
  });
  return (
    <a href={ `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}>
      <div className="h-64 w-full rounded-lg overflow-hidden border border-black/10">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={center}
            zoom={15}
            options={{
              disableDefaultUI: true,
              clickableIcons: false,
              styles: [],
            }}
          >
            {lat != null && lng != null && <Marker position={{ lat, lng }} />}
          </GoogleMap>
        ) : (
          <div className="grid place-items-center h-full text-black">
            Loading map…
          </div>
        )}
      </div>
    </a>
  );
}
