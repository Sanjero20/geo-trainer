import { create } from "zustand";

interface RegionState {
  selectedRegion: string | null;
  setSelectedRegion: (region: string | null) => void;
}

const useRegion = create<RegionState>((set, get) => ({
  selectedRegion: null,
  setSelectedRegion: (region) => set({ selectedRegion: region }),
}));

export default useRegion;
