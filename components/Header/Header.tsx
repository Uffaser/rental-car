import Link from "next/link";
import style from "./Header.module.css";

export default function Header() {
  return (
    <header className={style.header}>
      <Link className={style.headerLogo} href="/">
        <svg width={104} height={16}>
          <use href="/sprite.svg#icon-rental-car"></use>
        </svg>
      </Link>
      <nav>
        <ul className={style.headerNav}>
          <li>
            <Link className={style.navLink} href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={style.navLink} href="/catalog">
              Catalog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
