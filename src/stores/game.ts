import { create } from "zustand";
import { shuffleArray } from "@/lib/array-utils";
import { getAllProvinces } from "@/data/provinces";

type Status = "playing" | "not-playing";

interface Provinces {
  name: string;
  guessed: boolean | null;
}

interface GameStates {
  status: Status;
  provinces: Provinces[];
  currentIndex: number;
  remaining: number;
}

interface GameActions {
  setGameStatus: (status: Status) => void;
  resetGame: () => void;

  getGameData: () => {
    provinces: Provinces[];
    currentIndex: number;
    currentlyGuessing: string;
  };

  updateGameData: (provinces: Provinces[]) => void;
}

const initialProvinces = () => {
  const provinces = shuffleArray(getAllProvinces());
  const list = provinces.map((province: any) => ({
    name: province,
    guessed: null,
  }));

  return list;
};

const initialRemaining = getAllProvinces().length;

export const useGameStore = create<GameStates & GameActions>((set, get) => ({
  status: "not-playing",

  setGameStatus: (status) => {
    set({ status });
  },

  // Main game interaction
  provinces: initialProvinces(),
  currentIndex: 0,
  remaining: initialRemaining,

  // Game handlers
  resetGame: () => {
    set({
      provinces: initialProvinces(),
      currentIndex: 0,
      remaining: initialRemaining,
    });
  },

  getGameData: () => {
    const provinces = get().provinces;
    const currentIndex = get().currentIndex;

    return {
      provinces,
      currentIndex,
      currentlyGuessing: provinces[currentIndex]?.name || "",
    };
  },

  updateGameData: (provinces) => {
    set({
      provinces,
      currentIndex: get().currentIndex + 1,
      remaining: get().remaining - 1,
    });
  },
}));
