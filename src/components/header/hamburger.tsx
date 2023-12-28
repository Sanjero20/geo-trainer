"use client";

import { useMenuStore } from "@/stores/menu";
import { Menu } from "lucide-react";

function Hamburger() {
  const { toggleMenu } = useMenuStore();

  return <Menu onClick={toggleMenu} className="cursor-pointer sm:hidden" />;
}

export default Hamburger;
