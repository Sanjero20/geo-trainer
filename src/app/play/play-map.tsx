"use client";

import { useCallback, useState, MouseEvent, useEffect } from "react";
import { GeoJSON } from "react-leaflet";
import { Layer, LeafletMouseEvent } from "leaflet";

import InteractiveMap from "@/components/interactive-map";
import MouseTooltip from "@/components/mouse-tooltip";
import { REGIONS } from "@/data/regions";
import {
  defaultStyles,
  wrongGuessColor,
  correctGuessColor,
  hoverColorPlay,
} from "@/constants/map-settings";

function PhilippinesMap() {
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMouseToolTip = (e: MouseEvent<HTMLDivElement>) => {
    const divWidth = e.currentTarget.offsetWidth;

    // Adjust offset base on container size
    const offsetX = divWidth < 1336 ? 15 : 275;
    const offsetY = 70;

    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    setTooltipPosition({ x, y });
  };

  const handleMouseEnter = () => {
    const currentGuessIndex = parseInt(localStorage.getItem("current") || "0");
    const provinces = JSON.parse(localStorage.getItem("provinces") || "[]");
    const currentlyGuessing = provinces[currentGuessIndex]?.name || "";

    if (currentGuessIndex === provinces.length - 1) return;

    setTooltipContent(currentlyGuessing);
  };

  const clickFeature = useCallback((e: LeafletMouseEvent) => {
    const layer = e.target;
    const map = layer._map;

    // Skip if the layer is already colored, indicating it's not clickable.
    if (layer.options.fillColor !== hoverColorPlay) return;

    const currentGuessIndex = parseInt(localStorage.getItem("current") || "0");
    const provinces = JSON.parse(localStorage.getItem("provinces") || "[]");
    const currentlyGuessing = provinces[currentGuessIndex]?.name || "";

    const province = layer.feature.properties.ADM2_EN;
    const isCorrect = province === currentlyGuessing;

    const updatedProvinces = provinces.map((province: any) =>
      province.name === currentlyGuessing
        ? { ...province, guessed: isCorrect }
        : province,
    );

    map.eachLayer((mapLayer: any) => {
      if (
        mapLayer.feature &&
        mapLayer.feature.properties.ADM2_EN === currentlyGuessing
      ) {
        const fillColor = isCorrect ? correctGuessColor : wrongGuessColor;
        mapLayer.setStyle({ fillColor });
      }
    });

    // Clear the tooltip when finished indexing the entire list
    if (currentGuessIndex === provinces.length - 1) {
      setTooltipContent("");
      return;
    }

    localStorage.setItem("provinces", JSON.stringify(updatedProvinces));
    localStorage.setItem("current", JSON.stringify(currentGuessIndex + 1));

    setTooltipContent(provinces[currentGuessIndex + 1]?.name || "");
  }, []);

  const highlightFeature = useCallback((e: LeafletMouseEvent) => {
    const layer = e.target;
    const currentColor = layer.options.fillColor;

    if (currentColor === "white") {
      layer.setStyle({ fillColor: hoverColorPlay });
    }
  }, []);

  const resetStyles = useCallback((e: LeafletMouseEvent) => {
    const layer = e.target;
    const currentColor = layer.options.fillColor;

    if (currentColor === hoverColorPlay) {
      layer.setStyle(defaultStyles);
    }
  }, []);

  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      mousemove: highlightFeature,
      mouseout: resetStyles,
      click: clickFeature,
    });
  };

  useEffect(() => {
    // Cleanup function for component unmount or dependencies change
    return () => setTooltipContent("");
  }, []);

  return (
    <div
      className="relative h-full w-full"
      onMouseMove={handleMouseToolTip}
      onMouseLeave={() => setTooltipContent("")}
      onMouseEnter={handleMouseEnter}
    >
      <InteractiveMap>
        {REGIONS.map((region, index) => (
          <GeoJSON
            key={index}
            data={region as any}
            style={defaultStyles}
            onEachFeature={onEachFeature}
          />
        ))}
      </InteractiveMap>

      {tooltipContent && (
        <MouseTooltip position={tooltipPosition}>{tooltipContent}</MouseTooltip>
      )}
    </div>
  );
}

export default PhilippinesMap;
