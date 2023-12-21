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
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const clickFeature = useCallback((e: LeafletMouseEvent) => {
    const layer = e.target;
    const map = layer._map;

    console.log(map);

    /* 
    TODO: Check if the layer is already have a color in it red or green if so, dont do anything to it because it already guessed on it.
    */

    let current = localStorage.getItem("current");
    let parsedIndex = current ? parseInt(current) : 0;
    const provinces = JSON.parse(localStorage.getItem("provinces") || "");
    const currentlyGuessing = provinces[parsedIndex].name;

    const province = layer.feature.properties.ADM2_EN;
    const isCorrect = province === currentlyGuessing;

    const updateList = provinces.map((province: any) => {
      if (province.name === currentlyGuessing) {
        return { ...province, guessed: isCorrect };
      }

      return province;
    });

    map.eachLayer((mapLayer: any) => {
      if (
        mapLayer.feature &&
        mapLayer.feature.properties.ADM2_EN === currentlyGuessing
      ) {
        // Check if the layer corresponds to the feature you want to modify
        if (isCorrect) {
          mapLayer.setStyle({ fillColor: "green" });
        } else {
          mapLayer.setStyle({ fillColor: "red" });
        }
      }
    });

    localStorage.setItem("provinces", JSON.stringify(updateList));
    localStorage.setItem("current", JSON.stringify(parsedIndex + 1));

    setTooltipContent(provinces[parsedIndex + 1].name);
  }, []);

  const highlightFeature = useCallback((e: LeafletMouseEvent) => {
    const layer = e.target;

    const currentColor = layer.options.fillColor;

    if (currentColor == "white") {
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

  const onEachFeature = (feature: any, layer: any, isCorrect: string) => {
    layer.on({
      mousemove: highlightFeature,
      mouseout: resetStyles,
      click: clickFeature,
    });

    const province = feature.properties.ADM2_EN;

    const savedProvince = JSON.parse(localStorage.getItem("provinces") || "");

    const filtered = savedProvince.filter(
      (item: any) => item.name === province,
    );

    if (!filtered) return;

    console.log(filtered[0].guessed);

    if (filtered[0].guessed) {
      layer.setStyle({ fillColor: "green" });
    } else if (filtered[0].guessed === false) {
      layer.setStyle({ fillColor: "red" });
    }
  };

  const handleMouseToolTip = (e: MouseEvent<HTMLDivElement>) => {
    // if (!tooltipContent) setTooltipContent();

    const x = e.clientX - 15;
    const y = e.clientY - 70;

    setTooltipPos({ x, y });
  };

  const handleMouseEnter = () => {
    let current = localStorage.getItem("current");
    let parsedIndex = current ? parseInt(current) : 0;
    const provinces = JSON.parse(localStorage.getItem("provinces") || "");
    const currentlyGuessing = provinces[parsedIndex].name;

    setTooltipContent(currentlyGuessing);
  };

  return (
    <div
      className="relative h-full w-full"
      onMouseMove={(e) => handleMouseToolTip(e)}
      onMouseLeave={() => setTooltipContent("")}
      onMouseEnter={handleMouseEnter}
    >
      <InteractiveMap>
        {REGIONS.map((region, index) => {
          return (
            <GeoJSON
              key={index}
              data={region as any}
              style={defaultStyles as any}
              onEachFeature={(e, l) => onEachFeature(e, l, "asdf")}
            />
          );
        })}
      </InteractiveMap>

      {tooltipContent && (
        <MouseTooltip position={tooltipPos}>{tooltipContent}</MouseTooltip>
      )}
    </div>
  );
}

export default PhilippinesMap;
