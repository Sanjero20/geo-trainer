"use client";

import "leaflet/dist/leaflet.css";

import React from "react";
import { MapContainer } from "react-leaflet";

import {
  philippinesCenter,
  philippinesBoundary,
  mapBackgroundColor,
} from "@/constants/map-settings";

interface InteractiveMapProps {
  children: React.ReactNode;
}

function InteractiveMap({ children }: InteractiveMapProps) {
  return (
    <MapContainer
      className="h-full w-full"
      center={philippinesCenter as any}
      zoom={5}
      minZoom={5.25}
      maxZoom={10}
      maxBounds={philippinesBoundary as any}
      style={{ background: mapBackgroundColor }}
      attributionControl={false}
      doubleClickZoom={false}
      zoomControl={false}
    >
      {/* GeoJSON */}
      {children}
    </MapContainer>
  );
}

export default InteractiveMap;
