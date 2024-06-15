"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./nav-link.module.css";

type NavLinkPropsType = {
  href: string;
  children: React.ReactNode;
};

export default function NavLink({ href, children }: NavLinkPropsType) {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={path.startsWith(href) ? styles.active : undefined}
    >
      {children}
    </Link>
  );
}
