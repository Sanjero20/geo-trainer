import { Button } from "../ui/button";
import NavLink from "./navlink";

function Header() {
  return (
    <header className="flex h-12 items-center justify-between py-8">
      <h1 className="text-2xl font-bold">GEO TRAINER</h1>

      <nav>
        <ul className="flex items-center gap-12">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/learn">Learn</NavLink>
          <NavLink href="/about">About</NavLink>
          <Button className="px-8">Login</Button>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
