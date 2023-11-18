"use client";

import React, { useMemo } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";

import { REGIONS } from "@/data/regions";
import { regionFormatter } from "@/lib/regionFormatter";
import useRegion from "@/stores/region";

type Region = {
  region: string;
  provinces: string[];
};

function RegionList() {
  const { setSelectedRegion } = useRegion();

  const regions = useMemo(
    () => REGIONS.map((region) => regionFormatter(region)),
    [],
  );

  return (
    <ScrollArea className="h-[80vh]">
      {regions.map((region) => (
        <React.Fragment key={region.name}>
          <p
            className="box-border flex items-center rounded-sm p-2 hover:bg-red-900 hover:text-white"
            onClick={() => setSelectedRegion(region.name)}
          >
            {region.name}
          </p>

          {/* <Separator /> */}
        </React.Fragment>
      ))}
    </ScrollArea>
  );
}

export default RegionList;
