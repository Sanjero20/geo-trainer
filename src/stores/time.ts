import { create } from "zustand";

interface TimeStates {
  time: number;
  isRunning: boolean;
}

interface TimeActions {
  setTime: (time: number) => void;
  restartTime: () => void;
  startTime: () => void;
  stopTime: () => void;
}

export const useTimeStore = create<TimeStates & TimeActions>((set) => ({
  time: 0,
  isRunning: false,

  setTime: (time) => set({ time }),
  restartTime: () => set({ time: 0 }),

  startTime: () => set({ isRunning: true }),
  stopTime: () => set({ isRunning: false }),
}));
