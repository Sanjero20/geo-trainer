"use client";

import { useCallback, useMemo, useState } from "react";

import { GeoJSON, Tooltip } from "react-leaflet";
import { Layer, LeafletMouseEvent } from "leaflet";

import InteractiveMap from "@/components/interactive-map";
import MouseTooltip from "@/components/mouse-tooltip";
import {
  defaultStyles,
  hoverStyles,
  selectedStyles,
  selectedColor,
  selectedHoveredColor,
  selectedHoverStyles,
} from "@/components/interactive-map/map-settings";
import useRegion from "@/stores/region";
import { REGIONS } from "@/data/regions";
import { isMobileDevice } from "@/lib/utils";

function LearnPhilippinesMap() {
  const { selectedRegion } = useRegion();

  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const highlightFeature = useCallback((e: LeafletMouseEvent) => {
    const layer = e.target;

    // Extract event layer data
    const x = e.containerPoint.x + 15;
    const y = e.containerPoint.y + 5;
    const province = layer.feature.properties.province;

    // Set Tooltip coords and content
    setTooltipPos({ x, y });
    setTooltipContent(province);

    // set color
    const currentColor = layer.options.fillColor;

    if (
      currentColor === selectedColor ||
      currentColor == selectedHoveredColor
    ) {
      layer.setStyle(selectedHoverStyles);
    } else {
      layer.setStyle(hoverStyles);
    }
  }, []);

  const resetStyles = useCallback((e: LeafletMouseEvent) => {
    const layer = e.target;
    const currentColor = layer.options.fillColor;

    // set color
    if (currentColor === selectedColor) {
      layer.setStyle(selectedStyles);
    } else if (currentColor === selectedHoveredColor) {
      layer.setStyle(selectedStyles);
    } else {
      layer.setStyle(defaultStyles); // Turn back to white
    }

    setTooltipContent("");
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

  const memoizedRegions = useMemo(
    () => (
      <>
        {REGIONS.map((region, index) => {
          const regionName = region.features[0].properties.region;

          const styles =
            regionName === selectedRegion ? selectedStyles : defaultStyles;

          return (
            <GeoJSON
              key={index}
              data={region as any}
              style={styles as any}
              onEachFeature={onEachFeature}
            >
              {isMobileDevice() && <Tooltip sticky>{tooltipContent}</Tooltip>}
            </GeoJSON>
          );
        })}
      </>
    ),
    [onEachFeature, selectedRegion, tooltipContent],
  );

  return (
    <InteractiveMap>
      {memoizedRegions}

      {tooltipContent && (
        <MouseTooltip position={tooltipPos}>{tooltipContent}</MouseTooltip>
      )}
    </InteractiveMap>
  );
}

export default LearnPhilippinesMap;
