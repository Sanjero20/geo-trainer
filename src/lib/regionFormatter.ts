import { GeoJSONRegion } from "@/data/regions";

export function regionFormatter(region: GeoJSONRegion) {
  const regionFeatures = region.features;

  const regionName = regionFeatures[0].properties.region;
  const provinces = regionFeatures.map(
    (feature) => feature.properties.province,
  );

  return {
    name: regionName,
    provinces,
  };
}
