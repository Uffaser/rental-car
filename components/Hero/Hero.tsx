import Link from "next/link";
import style from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={style.hero}>
      <div className={style.heroContentWrapper}>
        <h1 className={style.heroTitle}>Find your perfect rental car</h1>
        <p className={style.heroSubtitle}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <Link className={style.heroBtn} href="/catalog">
          View Catalog
        </Link>
      </div>
    </section>
  );
}
