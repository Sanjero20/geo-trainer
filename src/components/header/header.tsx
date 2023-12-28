import NavLink from "./navlink";
import Hamburger from "./hamburger";
import MobileMenu from "./mobile";

function Header() {
  return (
    <header className="z-[999] flex items-center justify-between">
      <h1 className="text-2xl font-bold">GEO TRAINER</h1>

      <nav>
        <ul className="hidden items-center gap-12 sm:flex">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/learn">Learn</NavLink>
          <NavLink href="/play">Play</NavLink>
        </ul>

        <Hamburger />
      </nav>

      <MobileMenu />
    </header>
  );
}

export default Header;
