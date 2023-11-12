"use client";

import { useMemo } from "react";
import { Card } from "@/components/ui/card";
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
    <div className="flex flex-col gap-2">
      {regions.map((region) => (
        <Card
          key={region.name}
          className="flex items-center justify-center py-1 hover:bg-red-900 hover:text-white"
          onMouseEnter={() => setSelectedRegion(region.name)}
          onMouseLeave={() => setSelectedRegion(null)}
        >
          <p className="">{region.name}</p>
        </Card>
      ))}
    </div>
  );
}

export default RegionList;
