import { Menu } from "lucide-react";
import NavLink from "./navlink";

function Header() {
  return (
    <header className="z-10 flex items-center justify-between">
      <h1 className="text-2xl font-bold">GEO TRAINER</h1>

      <nav>
        <ul className="hidden items-center gap-12 sm:flex">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/learn">Learn</NavLink>
          <NavLink href="/play">Play</NavLink>
        </ul>

        <Menu className="cursor-pointer sm:hidden" />
      </nav>
    </header>
  );
}

export default Header;
