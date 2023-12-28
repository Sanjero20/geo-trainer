import { create } from "zustand";

interface Props {
  menuIsOpen: boolean;
  setMenuIsOpen: (bool: boolean) => void;
}

export const useMenuStore = create<Props>((set, get) => ({
  menuIsOpen: false,
  setMenuIsOpen: (bool) => {
    set({ menuIsOpen: bool });
  },
}));
