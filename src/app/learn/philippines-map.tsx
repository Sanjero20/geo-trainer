"use client";

import { useCallback } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import { LatLngBoundsExpression, Layer, LeafletMouseEvent } from "leaflet";
import { REGIONS } from "@/data/regions";

import "leaflet/dist/leaflet.css";

const defaultStyles = {
  color: "#6e6e6e",
  fillColor: "white",
  fillOpacity: "white",
  dashArray: "",
  weight: 1,
};

const philippinesBoundary: LatLngBoundsExpression = [
  [4.277256, 122.416079],
  [21.33895, 121.721292],
  [3.086835, 116.133513],
  [13.5145, 127.301521],
];

function PhilippinesMap() {
  const highlightFeature = useCallback((e: LeafletMouseEvent) => {
    const layer = e.target;

    // Extract layer properties
    const { ADM1_EN: region, ADM2_EN: provinceName } = layer.feature.properties;
    console.log(region, ":", provinceName);

    // Change layer color
    layer.setStyle({
      fillColor: "#37cc37",
      fillOpacity: "1",
    });
  }, []);

  const resetStyles = useCallback((e: LeafletMouseEvent) => {
    e.target.setStyle(defaultStyles);
  }, []);

  const onEachFeature = useCallback(
    (feature: any, layer: Layer) => {
      layer.on({
        mousedown: highlightFeature,
        mouseup: resetStyles,
        mouseout: resetStyles,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <MapContainer
      className="h-full w-full bg-sky-200"
      center={[12.8797, 121.774]}
      zoom={5}
      minZoom={5.25}
      maxZoom={8}
      maxBounds={philippinesBoundary}
      style={{ background: "#d4f1f9" }}
      attributionControl={false}
      doubleClickZoom={false}
    >
      {REGIONS.map((region, index) => (
        <GeoJSON
          key={index}
          data={region as any}
          onEachFeature={onEachFeature}
          style={(feature: any) => defaultStyles as any}
        />
      ))}
    </MapContainer>
  );
}

export default PhilippinesMap;
