"use client";
import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useRegion from "@/stores/region";
import { REGIONS } from "@/data/regions";
import { regionFormatter } from "@/lib/regionFormatter";

function SelectRegion() {
  const { selectedRegion, setSelectedRegion } = useRegion();

  const regions = useMemo(
    () => REGIONS.map((region) => regionFormatter(region)),
    [],
  );

  const handleSelect = (value: string) => {
    if (value === "none") {
      setSelectedRegion(null);
      return;
    }

    setSelectedRegion(value);
  };

  return (
    <Select value={selectedRegion || ""} onValueChange={handleSelect}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Region" />
      </SelectTrigger>

      <SelectContent className="z-[999] w-fit">
        {selectedRegion && <SelectItem value="none">None</SelectItem>}

        {regions.map((region, index) => (
          <SelectItem key={index} value={region.name}>
            {region.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SelectRegion;
