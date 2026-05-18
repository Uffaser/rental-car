"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import style from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isCatalogPage = pathname === "/catalog";

  return (
    <header className={style.header}>
      <div className={style.headerContent}>
        <Link className={style.headerLogo} href="/">
          <svg width={104} height={16}>
            <use href="/sprite.svg#icon-rental-car"></use>
          </svg>
        </Link>
        <nav>
          <ul className={style.headerNav}>
            <li>
              <Link
                className={`${style.navLink} ${isHomePage ? style.activeNavLink : ""}`}
                href="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={`${style.navLink} ${isCatalogPage ? style.activeNavLink : ""}`}
                href="/catalog"
              >
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
