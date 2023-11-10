import NavLink from "./navlink";
import { Menu } from "lucide-react";

function Header() {
  return (
    <header className="flex h-12 items-center justify-between px-2 py-8 sm:container">
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
