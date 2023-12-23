import region1 from "./geojson/region-1.json";
import region2 from "./geojson/region-2.json";
import region3 from "./geojson/region-3.json";
import region4a from "./geojson/region-4a.json";
import region4b from "./geojson/region-4b.json";
import region5 from "./geojson/region-5.json";
import region6 from "./geojson/region-6.json";
import region7 from "./geojson/region-7.json";
import region8 from "./geojson/region-8.json";
import region9 from "./geojson/region-9.json";
import region10 from "./geojson/region-10.json";
import region11 from "./geojson/region-11.json";
import region12 from "./geojson/region-12.json";
import region13 from "./geojson/region-13.json";

import NCR from "./geojson/ncr.json";
import CAR from "./geojson/car.json";
import BARMM from "./geojson/barmm.json";

const LUZON = [
  NCR,
  CAR,
  region1,
  region2,
  region3,
  region4a,
  region4b,
  region5,
];

const VISAYAS = [region6, region7, region8];

const MINDANAO = [region9, region10, region11, region12, region13, BARMM];

export const REGIONS = [...LUZON, ...VISAYAS, ...MINDANAO];

export type GeoJSONRegion = typeof region1;
