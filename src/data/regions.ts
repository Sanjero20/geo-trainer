import region1 from "./regions/region-1.json";
import region2 from "./regions/region-2.json";
import region3 from "./regions/region-3.json";
import region4a from "./regions/region-4a.json";
import region4b from "./regions/region-4b.json";
import region5 from "./regions/region-5.json";
import region6 from "./regions/region-6.json";
import region7 from "./regions/region-7.json";
import region8 from "./regions/region-8.json";
import region9 from "./regions/region-9.json";
import region10 from "./regions/region-10.json";
import region11 from "./regions/region-11.json";
import region12 from "./regions/region-12.json";
import region13 from "./regions/region-13.json";
import NCR from "./regions/ncr.json";
import CAR from "./regions/car.json";
import BARMM from "./regions/barmm.json";

export const LUZON = [
  NCR,
  CAR,
  region1,
  region2,
  region3,
  region4a,
  region4b,
  region5,
];

export const VISAYAS = [region6, region7, region8];

export const MINDANAO = [
  region9,
  region10,
  region11,
  region12,
  region13,
  BARMM,
];

export const REGIONS = [...LUZON, ...VISAYAS, ...MINDANAO];

export type GeoJSONRegion = typeof region1;
