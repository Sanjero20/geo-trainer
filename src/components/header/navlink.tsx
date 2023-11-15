"use client";

import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
  const route = usePathname();
  const styles = twMerge(
    href === route ? "border-white" : "border-transparent",
    "border-b-2",
  );

  return (
    <Link className={styles} href={href}>
      {children}
    </Link>
  );
}

export default NavLink;
