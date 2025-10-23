import React, { useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 10.8505, // default to somewhere in India (Kerala)
  lng: 76.2711,
};

interface GeoPoint {
  name: string;
  lat: number;
  lng: number;
  time?: string;
  landmark?: string;
}

interface RouteMapProps {
  source: GeoPoint;
  destination: GeoPoint;
  boardingPoints: GeoPoint[];
  droppingPoints: GeoPoint[];
  stops: GeoPoint[];
}

export default function RouteMap({
  source,
  destination,
  boardingPoints,
  droppingPoints,
  stops,
}: RouteMapProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  // ✅ Generate route dynamically
  useEffect(() => {
    if (
      !source.lat ||
      !source.lng ||
      !destination.lat ||
      !destination.lng
    ) {
      return;
    }

    const directionsService = new google.maps.DirectionsService();

    // ✅ Combine all waypoints (boarding, dropping, stops)
    const waypoints: google.maps.DirectionsWaypoint[] = [
      ...boardingPoints,
      ...stops,
      ...droppingPoints,
    ]
      .filter((p) => p.lat && p.lng)
      .map((p) => ({
        location: { lat: p.lat, lng: p.lng },
        stopover: true,
      }));

    // ✅ Request route
    directionsService.route(
      {
        origin: { lat: source.lat, lng: source.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        waypoints,
        optimizeWaypoints: true, // Reorder for best path
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result);

          // Fit map bounds to the route
          const bounds = new google.maps.LatLngBounds();
          result.routes[0].overview_path.forEach((p) => bounds.extend(p));
          map?.fitBounds(bounds);
        } else {
          console.error("Directions request failed:", status);
        }
      }
    );
  }, [source, destination, boardingPoints, droppingPoints, stops, map]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={6}
      onLoad={onLoad}
    >
      {/* ✅ Render the route */}
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            polylineOptions: {
              strokeColor: "#1E90FF", // highlight color
              strokeWeight: 5,
            },
            suppressMarkers: false, // Keep Google markers visible
          }}
        />
      )}
    </GoogleMap>
  );
}
