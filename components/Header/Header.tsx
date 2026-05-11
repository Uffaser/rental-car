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
      <nav className={style.headerNav}>
        <Link className={style.navLink} href="/">
          Home
        </Link>
        <Link className={style.navLink} href="/catalog">
          Catalog
        </Link>
      </nav>
    </header>
  );
}
