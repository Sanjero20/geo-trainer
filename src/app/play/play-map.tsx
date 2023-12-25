/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCallback, useState, MouseEvent, useEffect, useMemo } from "react";
import { GeoJSON } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";

import InteractiveMap from "@/components/interactive-map";
import MouseTooltip, { TooltipCoords } from "@/components/mouse-tooltip";

import { REGIONS } from "@/data/regions";
import {
  defaultStyles,
  wrongColor,
  correctColor,
  hoverColorPlay,
} from "@/constants/map-settings";
import { useGameStore } from "@/stores/game";

interface Props {
  mapStyles: any;
  restartGame: () => void;
}

function PhilippinesMap({ mapStyles, restartGame }: Props) {
  const { resetGame, getGameData, updateGameData } = useGameStore();

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
    const { provinces, currentIndex, currentlyGuessing } = getGameData();
    if (currentIndex < provinces.length - 1) {
      setTooltipContent(currentlyGuessing);
    }
  };

  const clickFeature = useCallback((e: LeafletMouseEvent) => {
    const layer = e.target;
    const map = layer._map;

    // Skip if the layer is already colored, indicating it's not clickable.
    if (layer.options.fillColor !== hoverColorPlay) return;

    const { provinces, currentIndex, currentlyGuessing } = getGameData();

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

    // Change the "guessed" flag if correct or not
    const updatedProvinces = provinces.map((province: any) =>
      province.name === currentlyGuessing
        ? { ...province, guessed: isCorrect }
        : province,
    );

    updateGameData(updatedProvinces);

    // Clear the tooltip when finished indexing the entire list
    if (currentIndex === provinces.length - 1) {
      setTooltipContent("");
      return;
    }

    setTooltipContent(provinces[currentIndex + 1].name || "");
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
    return () => {
      setTooltipContent("");
      resetGame();
    };
  }, []);

  const memoizedRegions = useMemo(
    () => (
      <>
        {REGIONS.map((region, index) => (
          <GeoJSON
            key={index}
            data={region as any}
            style={mapStyles as any}
            onEachFeature={onEachFeature}
          />
        ))}
      </>
    ),
    [restartGame],
  );

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-md"
      onMouseMove={handleMouseToolTip}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setTooltipContent("")}
    >
      <InteractiveMap>{memoizedRegions}</InteractiveMap>

      {tooltipContent && tooltipPosition && (
        <MouseTooltip position={tooltipPosition}>{tooltipContent}</MouseTooltip>
      )}
    </div>
  );
}

export default PhilippinesMap;
