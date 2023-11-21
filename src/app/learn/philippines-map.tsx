"use client";

import "leaflet/dist/leaflet.css";

import { useCallback, useState } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import { Layer, LeafletMouseEvent } from "leaflet";
import MouseTooltip from "@/components/custom/mouse-tooltip";

import { REGIONS } from "@/data/regions";
import useRegion from "@/stores/region";
import {
  philippinesBoundary,
  philippinesCenter,
  defaultStyles,
  hoverStyles,
  mapBackgroundColor,
} from "@/constants/map-settings";

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

    layer.setStyle(hoverStyles);
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
      className="h-full w-full"
      center={philippinesCenter as any}
      zoom={5}
      minZoom={5.25}
      maxZoom={8}
      maxBounds={philippinesBoundary as any}
      style={{ background: mapBackgroundColor }}
      attributionControl={false}
      doubleClickZoom={false}
    >
      {REGIONS.map((region, index) => {
        const regionName = region.features[0].properties.ADM1_EN;

        const styles =
          regionName === selectedRegion ? hoverStyles : defaultStyles;

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
        <MouseTooltip position={tooltipPos}>{tooltipContent}</MouseTooltip>
      )}
    </MapContainer>
  );
}

export default PhilippinesMap;
