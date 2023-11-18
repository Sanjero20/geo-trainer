"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
  const currentUrl = usePathname();

  const styles = cn(
    currentUrl === "/" ? "border-white" : "border-black",
    currentUrl !== href && "border-transparent",
    "border-b-2",
  );

  return (
    <Link className={styles} href={href}>
      {children}
    </Link>
  );
}

export default NavLink;
