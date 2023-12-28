import { create } from "zustand";

interface Props {
  menuIsOpen: boolean;
  toggleMenu: () => void;
}

export const useMenuStore = create<Props>((set, get) => ({
  menuIsOpen: false,
  toggleMenu: () => {
    set({ menuIsOpen: !get().menuIsOpen });
  },
}));
