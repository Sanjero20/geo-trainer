"use client";

import { useMenuStore } from "@/stores/menu";
import { Menu } from "lucide-react";

function Hamburger() {
  const { setMenuIsOpen } = useMenuStore();

  return (
    <Menu
      onClick={() => setMenuIsOpen(true)}
      className="cursor-pointer sm:hidden"
    />
  );
}

export default Hamburger;
