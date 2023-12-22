/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCallback, useState, MouseEvent, useEffect } from "react";
import { GeoJSON } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";

import InteractiveMap from "@/components/interactive-map";
import MouseTooltip, { TooltipCoords } from "@/components/mouse-tooltip";

import { REGIONS } from "@/data/regions";
import { getGameData } from "@/lib/game-utils";
import {
  defaultStyles,
  wrongColor,
  correctColor,
  hoverColorPlay,
} from "@/constants/map-settings";

interface Props {
  triggerScore: () => void;
}

function PhilippinesMap({ triggerScore }: Props) {
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState<TooltipCoords | null>(
    null,
  );

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
    const { provinces, currentGuessIndex, currentlyGuessing } = getGameData();
    if (currentGuessIndex < provinces.length - 1) {
      setTooltipContent(currentlyGuessing);
    }
  };

  const clickFeature = useCallback((e: LeafletMouseEvent) => {
    const layer = e.target;
    const map = layer._map;

    // Skip if the layer is already colored, indicating it's not clickable.
    if (layer.options.fillColor !== hoverColorPlay) return;

    const { provinces, currentGuessIndex, currentlyGuessing } = getGameData();
    const province = layer.feature.properties.ADM2_EN;
    const isCorrect = province === currentlyGuessing;

    // Update the styles of the correct layer
    map.eachLayer((mapLayer: any) => {
      if (
        mapLayer.feature &&
        mapLayer.feature.properties.ADM2_EN === currentlyGuessing
      ) {
        const fillColor = isCorrect ? correctColor : wrongColor;
        mapLayer.setStyle({ fillColor });
      }
    });

    // Clear the tooltip when finished indexing the entire list
    if (currentGuessIndex === provinces.length - 1) {
      setTooltipContent("");
      return;
    }

    setTooltipContent(provinces[currentGuessIndex + 1]?.name || "");

    const updatedProvinces = provinces.map((province: any) =>
      province.name === currentlyGuessing
        ? { ...province, guessed: isCorrect }
        : province,
    );

    // Save changes to local storage
    localStorage.setItem("provinces", JSON.stringify(updatedProvinces));
    localStorage.setItem("current", JSON.stringify(currentGuessIndex + 1));

    triggerScore();
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
      className="relative h-full w-full overflow-hidden rounded-xl"
      onMouseMove={handleMouseToolTip}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setTooltipContent("")}
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

      {tooltipContent && tooltipPosition && (
        <MouseTooltip position={tooltipPosition}>{tooltipContent}</MouseTooltip>
      )}
    </div>
  );
}

export default PhilippinesMap;
