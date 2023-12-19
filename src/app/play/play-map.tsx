"use client";

import "leaflet/dist/leaflet.css";

import { useCallback, useState, MouseEvent } from "react";

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

interface Props {
  guessProvince: string;
}

function PhilippinesMap({ guessProvince }: Props) {
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const clickFeature = useCallback(
    (e: LeafletMouseEvent) => {
      const layer = e.target;

      // Check if the layer is already have a color in it red or green
      // if so, dont do anything to it because it already guessed on it.

      const { ADM2_EN: province } = layer.feature.properties;
      const style =
        province === guessProvince ? correctGuessColor : wrongGuessColor;

      console.log(style, province, guessProvince);

      layer.setStyle({ fillColor: style });
    },
    [guessProvince],
  );

  const highlightFeature = useCallback((e: LeafletMouseEvent) => {
    const layer = e.target;

    const currentColor = layer.options.fillColor;

    if (currentColor == "white") {
      layer.setStyle({ fillColor: hoverColorPlay });
    } else {
      layer.setStyle("blue");
    }
  }, []);

  const resetStyles = useCallback((e: LeafletMouseEvent) => {
    const layer = e.target;

    const currentColor = layer.options.fillColor;

    if (currentColor === hoverColorPlay) {
      layer.setStyle(defaultStyles);
    }
  }, []);

  const onEachFeature = useCallback(
    (feature: any, layer: Layer) => {
      layer.on({
        mousemove: highlightFeature,
        mouseout: resetStyles,
        click: clickFeature,
      });
    },

    [clickFeature, resetStyles, highlightFeature],
  );

  const handleMouseToolTip = (e: MouseEvent<HTMLDivElement>) => {
    if (!tooltipContent) setTooltipContent(guessProvince);

    const x = e.clientX - 15;
    const y = e.clientY - 70;

    setTooltipPos({ x, y });
  };

  return (
    <div
      className="relative h-full w-full"
      onMouseMove={(e) => handleMouseToolTip(e)}
      onMouseLeave={(e) => setTooltipContent("")}
    >
      <InteractiveMap>
        {REGIONS.map((region, index) => {
          const regionName = region.features[0].properties.ADM1_EN;

          return (
            <GeoJSON
              key={index}
              data={region as any}
              style={defaultStyles as any}
              onEachFeature={onEachFeature}
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
