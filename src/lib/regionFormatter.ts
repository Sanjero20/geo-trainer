import { GeoJSONRegion } from "@/data/regions";

export function regionFormatter(region: GeoJSONRegion) {
  const regionFeatures = region.features;

  const regionName = regionFeatures[0].properties.ADM1_EN;
  const provinces = regionFeatures.map((feature) => feature.properties.ADM2_EN);

  return {
    name: regionName,
    provinces,
  };
}
