"use client";

import { X, HomeIcon, Book, ClipboardEdit } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMenuStore } from "@/stores/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import NavLink from "./navlink";

function MobileMenu() {
  const { menuIsOpen, toggleMenu } = useMenuStore();

  const pathname = usePathname();

  useEffect(() => {
    toggleMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const styles = cn(
    "absolute left-0 top-0 flex h-screen w-screen items-center justify-center bg-background transition-opacity ease-out sm:hidden",
    menuIsOpen ? "opacity-100" : "opacity-0 invisible",
  );

  return (
    <div className={styles}>
      <div className="relative flex h-full w-full flex-col items-center justify-center">
        {/* Close Icon */}
        <X className="absolute right-2 top-3" onClick={toggleMenu} />

        {/* Main Menu */}
        <nav className="flex flex-col gap-8">
          <NavLink href="/" className="flex items-center gap-2 text-2xl">
            <HomeIcon />
            Home
          </NavLink>

          <NavLink href="/learn" className="flex items-center gap-2 text-2xl">
            <Book />
            Learn
          </NavLink>

          <NavLink href="/play" className="flex items-center gap-2 text-2xl">
            <ClipboardEdit />
            Play
          </NavLink>
        </nav>
      </div>
    </div>
  );
}

export default MobileMenu;
