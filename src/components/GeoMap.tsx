"use client";

import "leaflet/dist/leaflet.css";

import { MapContainer, GeoJSON } from "react-leaflet";
import { LUZON, MINDANAO, VISAYAS } from "@/data/regions";

const GeoMap = () => {
  return (
    <MapContainer
      className="h-full w-full"
      center={[12.8797, 121.774]}
      zoom={5}
      zoomControl={false}
      minZoom={6}
      maxZoom={8}
      maxBounds={[
        [4.277256, 122.416079],
        [21.33895, 121.721292],
        [3.086835, 116.133513],
        [13.5145, 127.301521],
      ]}
      attributionControl={false}
      style={{ background: "white" }}
    >
      {[...LUZON, ...VISAYAS, ...MINDANAO].map((region, index) => (
        <GeoJSON data={region as any} key={index} />
      ))}
    </MapContainer>
  );
};

export default GeoMap;
