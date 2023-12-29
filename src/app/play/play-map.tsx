/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, {
  useCallback,
  useState,
  MouseEvent,
  useEffect,
  useMemo,
} from "react";
import { GeoJSON } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";

import Blocker from "./blocker";
import InteractiveMap from "@/components/interactive-map";
import MouseTooltip, { TooltipCoords } from "@/components/mouse-tooltip";
import {
  defaultStyles,
  wrongColor,
  correctColor,
  hoverColorPlay,
} from "@/components/interactive-map/map-settings";

import { useGameStore } from "@/stores/game";
import { REGIONS } from "@/data/regions";
import { isMobileDevice } from "@/lib/utils";

interface Props {
  mapStyles: any;
  restartGame: () => void;
}

function PhilippinesMap({ mapStyles, restartGame }: Props) {
  const {
    status,
    getGameStatus,
    setGameStatus,
    resetGameData,
    getGameData,
    updateGameData,
  } = useGameStore();

  const [isMobile, setMobileMobile] = useState(isMobileDevice());
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState<TooltipCoords | null>(
    null,
  );

  // Event handlers
  const handleMouseToolTip = (e: MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;

    const divWidth = e.currentTarget.offsetWidth;
    const offsetX = divWidth < 1336 ? 15 : 275;
    const offsetY = 60;

    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    setTooltipPosition({ x, y });
  };

  const handleMouseEnter = () => {
    if (isMobile) return;

    const { provinces, currentIndex, currentlyGuessing } = getGameData();
    if (currentIndex < provinces.length - 1) {
      setTooltipContent(currentlyGuessing);
    }
  };

  const handleMouseLeave = () => {
    if (isMobile) return;

    setTooltipPosition(null);
    setTooltipContent("");
  };

  // Game logic
  const clickFeature = useCallback(
    (e: LeafletMouseEvent) => {
      if (status === "gameover") return;

      const layer = e.target;
      const map = layer._map;

      if (layer.options.fillColor !== hoverColorPlay) return;

      const { provinces, currentIndex, currentlyGuessing } = getGameData();

      const province = layer.feature.properties.province;
      const isCorrect = province === currentlyGuessing;

      // Update styles of the correct layer
      map.eachLayer((mapLayer: any) => {
        if (
          mapLayer.feature &&
          mapLayer.feature.properties.province === currentlyGuessing
        ) {
          const fillColor = isCorrect ? correctColor : wrongColor;
          mapLayer.setStyle({ fillColor });
        }
      });

      // Update the "guessed" flag
      const updatedProvinces = provinces.map((province: any) =>
        province.name === currentlyGuessing
          ? { ...province, guessed: isCorrect }
          : province,
      );

      updateGameData(updatedProvinces);

      // Clear the tooltip when finished indexing the entire list
      if (currentIndex === provinces.length - 1) {
        setGameStatus("gameover");
        setTooltipContent("");
        return;
      }

      setTooltipContent(provinces[currentIndex + 1].name || "");
    },
    [status],
  );

  const highlightFeature = useCallback((e: LeafletMouseEvent) => {
    const layer = e.target;
    const currentColor = layer.options.fillColor;

    if (currentColor === "white") {
      layer.setStyle({ fillColor: hoverColorPlay });
    }

    // Allow map interactivity when the game is over
    if (getGameStatus() === "gameover") {
      const x = e.containerPoint.x + 15;
      const y = e.containerPoint.y + 5;
      const { province: province } = layer.feature.properties;

      setTooltipPosition({ x, y });
      setTooltipContent(province);
    }
  }, []);

  const resetStyles = useCallback(
    (e: LeafletMouseEvent) => {
      const layer = e.target;
      const currentColor = layer.options.fillColor;

      if (currentColor === hoverColorPlay) {
        layer.setStyle(defaultStyles);
      }

      if (getGameStatus() === "gameover" && !isMobile) {
        setTooltipContent("");
      }
    },
    [status],
  );

  const onEachFeature = useCallback(
    (feature: any, layer: any) => {
      layer.on({
        mousemove: highlightFeature,
        mouseout: resetStyles,
        click: clickFeature,
      });
    },
    [status],
  );

  // Effects
  useEffect(() => {
    if (isMobile) {
      const { currentlyGuessing } = getGameData();
      setTooltipContent(currentlyGuessing);
    }

    // Cleanup function for component unmount or dependencies change
    return () => {
      setTooltipContent("");
      setTooltipPosition(null);
      resetGameData();
    };
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const { currentlyGuessing } = getGameData();
    setTooltipContent(currentlyGuessing);
  }, [restartGame]);

  const memoizedRegions = useMemo(
    () => (
      <>
        {REGIONS.map((region, index) => (
          <GeoJSON
            key={index}
            data={region as any}
            style={mapStyles}
            onEachFeature={onEachFeature}
          />
        ))}
      </>
    ),
    [restartGame, tooltipContent, status],
  );

  // Render component
  return (
    <>
      {/* Display the Province that must be clicked */}
      {isMobile && status === "playing" && <div>Find: {tooltipContent}</div>}

      <div
        className="relative h-full w-full overflow-hidden rounded-md"
        onMouseMove={handleMouseToolTip}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {status === "not-playing" && <Blocker />}

        <InteractiveMap>{memoizedRegions}</InteractiveMap>

        {status !== "not-playing" && tooltipContent && tooltipPosition && (
          <MouseTooltip position={tooltipPosition}>
            {tooltipContent}
          </MouseTooltip>
        )}
      </div>
    </>
  );
}

export default PhilippinesMap;
