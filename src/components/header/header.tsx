"use client";

import NavLink from "./navlink";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

function Header() {
  const currentUrl = usePathname();

  const styles = cn(
    currentUrl === "/" ? "text-white" : "text-black",
    "z-10 flex items-center justify-between h-16 py-2 px-4",
    "sm:container",
  );

  return (
    <header className={styles}>
      <h1 className="text-2xl font-bold">GEO TRAINER</h1>

      <nav>
        <ul className="hidden items-center gap-12 sm:flex">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/learn">Learn</NavLink>
          <NavLink href="/play">Play</NavLink>
          <NavLink href="/about">About</NavLink>
        </ul>

        <Menu className="cursor-pointer sm:hidden" />
      </nav>
    </header>
  );
}

export default Header;
