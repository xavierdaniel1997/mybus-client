import React, { useState, useCallback } from 'react';
import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 0,
  lng: 0,
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
  directions: google.maps.DirectionsResult | null;
}

export default function RouteMap({
  source,
  destination,
  boardingPoints,
  droppingPoints,
  stops,
  directions,
}: RouteMapProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const updateMarkers = () => {
    markers.forEach(marker => marker.setMap(null));
    const newMarkers: google.maps.Marker[] = [];

    if (source.lat && source.lng) {
      newMarkers.push(new google.maps.Marker({ position: { lat: source.lat, lng: source.lng }, map, title: 'Source' }));
    }
    if (destination.lat && destination.lng) {
      newMarkers.push(new google.maps.Marker({ position: { lat: destination.lat, lng: destination.lng }, map, title: 'Destination' }));
    }
    boardingPoints.forEach(point => {
      if (point.lat && point.lng) {
        newMarkers.push(new google.maps.Marker({ position: { lat: point.lat, lng: point.lng }, map, title: 'Boarding' }));
      }
    });
    droppingPoints.forEach(point => {
      if (point.lat && point.lng) {
        newMarkers.push(new google.maps.Marker({ position: { lat: point.lat, lng: point.lng }, map, title: 'Dropping' }));
      }
    });
    stops.forEach(point => {
      if (point.lat && point.lng) {
        newMarkers.push(new google.maps.Marker({ position: { lat: point.lat, lng: point.lng }, map, title: 'Stop' }));
      }
    });

    setMarkers(newMarkers);

    if (map && newMarkers.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      newMarkers.forEach(marker => bounds.extend(marker.getPosition()!));
      map.fitBounds(bounds);
    }
  };

  // Update markers whenever props change
  React.useEffect(() => {
    if (map) {
      updateMarkers();
    }
  }, [map, source, destination, boardingPoints, droppingPoints, stops]);

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={2} onLoad={onLoad}>
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
}