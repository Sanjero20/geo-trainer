"use client";

import "leaflet/dist/leaflet.css";

import { useCallback, useEffect, useState, MouseEvent } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import { Layer, LeafletMouseEvent, setOptions } from "leaflet";
import { REGIONS } from "@/data/regions";
import useRegion from "@/stores/region";

const defaultStyles = {
  color: "#6e6e6e",
  fillColor: "white",
  fillOpacity: "white",
  dashArray: "",
  weight: 1,
  zIndex: 10,
};

const highlightStyles = {
  ...defaultStyles,
  fillColor: "#37cc37",
  fillOpacity: "1",
};

const philippinesBoundary = [
  [4.277256, 122.416079],
  [21.33895, 121.721292],
  [3.086835, 116.133513],
  [13.5145, 127.301521],
];

const philippinesCenter = [12.8797, 121.774];

function PhilippinesMap() {
  const { selectedRegion } = useRegion();

  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const highlightFeature = useCallback((e: LeafletMouseEvent) => {
    const layer = e.target;

    const x = e.containerPoint.x + 15;
    const y = e.containerPoint.y + 5;

    setTooltipPos({ x, y });

    const { ADM2_EN: province } = layer.feature.properties;
    setTooltipContent(province);

    layer.setStyle(highlightStyles);
  }, []);

  const resetStyles = useCallback((e: LeafletMouseEvent) => {
    setTooltipContent("");
    e.target.setStyle(defaultStyles);
  }, []);

  const onEachFeature = useCallback(
    (feature: any, layer: Layer) => {
      layer.on({
        mousemove: highlightFeature,
        mouseout: resetStyles,
      });
    },

    [highlightFeature, resetStyles],
  );

  return (
    <MapContainer
      className="h-full w-full bg-sky-200"
      center={philippinesCenter as any}
      zoom={5}
      minZoom={5.25}
      maxZoom={8}
      maxBounds={philippinesBoundary as any}
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
          />
        );
      })}

      {tooltipContent && (
        <div
          className="absolute rounded bg-black p-2 text-white"
          style={{
            top: `${tooltipPos.y}px`,
            left: `${tooltipPos.x}px`,
            zIndex: 1000,
          }}
        >
          {tooltipContent}
        </div>
      )}
    </MapContainer>
  );
}

export default PhilippinesMap;
