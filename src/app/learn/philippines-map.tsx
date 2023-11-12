"use client";

import { useCallback } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import { LatLngBoundsExpression, Layer, LeafletMouseEvent } from "leaflet";
import { REGIONS } from "@/data/regions";

import "leaflet/dist/leaflet.css";
import useRegion from "@/stores/region";

const defaultStyles = {
  color: "#6e6e6e",
  fillColor: "white",
  fillOpacity: "white",
  dashArray: "",
  weight: 1,
};

const highlightStyles = {
  ...defaultStyles,
  fillColor: "#37cc37",
  fillOpacity: "1",
};

const philippinesBoundary: LatLngBoundsExpression = [
  [4.277256, 122.416079],
  [21.33895, 121.721292],
  [3.086835, 116.133513],
  [13.5145, 127.301521],
];

function PhilippinesMap() {
  const { selectedRegion } = useRegion();

  const highlightFeature = useCallback((e: LeafletMouseEvent) => {
    const layer = e.target;
    layer.setStyle(highlightStyles);
  }, []);

  const resetStyles = useCallback((e: LeafletMouseEvent) => {
    e.target.setStyle(defaultStyles);
  }, []);

  const onEachFeature = useCallback(
    (feature: any, layer: Layer) => {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetStyles,
      });
    },

    [highlightFeature, resetStyles],
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
      {REGIONS.map((region, index) => {
        const regionName = region.features[0].properties.ADM1_EN;

        const styles =
          regionName === selectedRegion ? highlightStyles : defaultStyles;

        return (
          <GeoJSON
            key={index}
            data={region as any}
            style={styles as any}
            onEachFeature={onEachFeature}
            // Render the other style in GeoJSON styles format
          />
        );
      })}
    </MapContainer>
  );
}

export default PhilippinesMap;
