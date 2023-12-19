import { GeoJSONRegion, REGIONS } from "./regions";

function getProvince(region: GeoJSONRegion): string[] {
  const provinces: string[] = [];

  const regionData = region.features;
  for (let i = 0; i < regionData.length; i++) {
    const province = regionData[i].properties.ADM2_EN;
    provinces.push(province);
  }

  return provinces;
}

export function getAllProvinces() {
  const provinces: string[] = [];

  for (let i = 0; i < REGIONS.length; i++) {
    const list = getProvince(REGIONS[i]);
    provinces.push(...list);
  }

  return provinces;
}
