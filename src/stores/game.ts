import { create } from "zustand";
import { getAllProvinces } from "@/data/provinces";
import { shuffleArray } from "@/lib/game";

type Status = "playing" | "not-playing";

export interface Province {
  name: string;
  guessed: boolean | null;
}

interface GameStates {
  status: Status;
  provinces: Province[];
  currentIndex: number;
  remaining: number;
}

interface GameActions {
  setGameStatus: (status: Status) => void;
  resetGameData: () => void;

  getGameData: () => {
    provinces: Province[];
    currentIndex: number;
    currentlyGuessing: string;
  };

  updateGameData: (provinces: Province[]) => void;
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
  resetGameData: () => {
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
