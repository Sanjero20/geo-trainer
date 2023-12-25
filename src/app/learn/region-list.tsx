"use client";

import React, { useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { regionFormatter } from "@/lib/regionFormatter";

import { ScrollArea } from "@/components/ui/scroll-area";

import { REGIONS } from "@/data/regions";
import useRegion from "@/stores/region";

function RegionList() {
  const { selectedRegion, setSelectedRegion } = useRegion();

  const regions = useMemo(
    () => REGIONS.map((region) => regionFormatter(region)),
    [],
  );

  const handleSelectRegion = (regionName: string) => {
    if (regionName == selectedRegion) {
      setSelectedRegion(null);
    } else {
      setSelectedRegion(regionName);
    }
  };

  useEffect(() => {
    return () => setSelectedRegion("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollArea className="h-[80vh]">
      {regions.map((region) => (
        <React.Fragment key={region.name}>
          <p
            className={cn(
              "box-border flex cursor-pointer items-center rounded-sm p-2 hover:bg-zinc-300 hover:text-slate-700",
              selectedRegion === region.name &&
                "bg-primary text-white hover:bg-primary hover:text-white",
            )}
            onClick={() => handleSelectRegion(region.name)}
          >
            {region.name}
          </p>
        </React.Fragment>
      ))}
    </ScrollArea>
  );
}

export default RegionList;
