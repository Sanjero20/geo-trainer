"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

function NavLink({ href, children, className }: NavLinkProps) {
  const currentUrl = usePathname();

  const styles = cn(
    // currentUrl === "/" && "border-black",
    currentUrl === href ? "border-black" : "border-transparent",
    "border-b-2",
    className,
  );

  return (
    <Link className={styles} href={href}>
      {children}
    </Link>
  );
}

export default NavLink;
