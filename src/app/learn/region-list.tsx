"use client";

import { REGIONS } from "@/data/regions";
import { regionFormatter } from "@/lib/regionFormatter";
import { useEffect, useMemo } from "react";

type Region = {
  region: string;
  provinces: string[];
};

function RegionList() {
  const regions = useMemo(
    () => REGIONS.map((region) => regionFormatter(region)),
    [],
  );

  return (
    <div className="prose overflow-auto">
      {regions.map((region) => (
        <div key={region.name}>
          <h1 className="font-bold">{region.name}</h1>

          <ul>
            {region.provinces.map((province, index) => (
              <li key={index} className="w-fit hover:cursor-pointer">
                {province}
              </li>
            ))}
          </ul>
        </div>
      ))}
      {/*  */}
    </div>
  );
}

export default RegionList;
