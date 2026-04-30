'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default icon paths (broken in bundlers like Webpack/Next.js)
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Helper component to re-center the map when coordinates change or fit bounds for routes
function MapController({ lat, lng, routeGeometry }: { lat: number; lng: number, routeGeometry?: any }) {
  const map = useMap();
  useEffect(() => {
    if (routeGeometry) {
      const coordinates = routeGeometry.coordinates.map((c: any) => [c[1], c[0]]);
      const bounds = L.polyline(coordinates).getBounds();
      map.fitBounds(bounds, { padding: [50, 50], animate: true });
    } else {
      map.setView([lat, lng], map.getZoom(), { animate: true });
    }
  }, [lat, lng, map, routeGeometry]);
  return null;
}

interface LeafletMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  markerLabel?: string;
  className?: string;
  pulseColor?: string;
  routeGeometry?: any; // GeoJSON geometry from OSRM
  destCoords?: { lat: number; lng: number };
}

export default function LeafletMap({
  lat,
  lng,
  zoom = 15,
  markerLabel = 'Your Location',
  className = '',
  pulseColor = '#006a6a',
  routeGeometry,
  destCoords
}: LeafletMapProps) {
  const polylinePositions = routeGeometry 
    ? routeGeometry.coordinates.map((c: any) => [c[1], c[0]]) 
    : [];

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={zoom}
      scrollWheelZoom={true}
      className={`w-full h-full ${className}`}
      style={{ minHeight: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      
      <Marker position={[lat, lng]}>
        <Popup>
          <span className="font-bold text-sm">Start: {markerLabel}</span>
        </Popup>
      </Marker>

      {destCoords && (
        <Marker position={[destCoords.lat, destCoords.lng]}>
          <Popup>
            <span className="font-bold text-sm">Destination</span>
          </Popup>
        </Marker>
      )}

      {routeGeometry && (
        <Polyline 
          positions={polylinePositions}
          pathOptions={{ 
            color: '#22C55E', 
            weight: 6, 
            opacity: 0.8,
            lineJoin: 'round'
          }} 
        />
      )}

      <MapController lat={lat} lng={lng} routeGeometry={routeGeometry} />
    </MapContainer>
  );
}

