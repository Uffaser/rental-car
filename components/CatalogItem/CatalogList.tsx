"use client";

import Image from "next/image";
import Link from "next/link";
import style from "./CatalogList.module.css";
import { Car } from "@/types/car";

type Props = {
  cars: Car[] | undefined;
};

export default function CatalogItem({ cars }: Props) {
  return (
    <ul className={style.catalogList}>
      {cars?.map((car) => (
        <li className={style.catalogCard} key={car.id}>
          <div className={style.imageWrapper}>
            <Image
              className={style.itemImg}
              src={car.img}
              alt={car.description}
              width={276}
              height={268}
            />
            <svg className={style.active} width={16} height={16}>
              <use href="/sprite.svg#icon-active-heart"></use>
            </svg>
            <svg className={style.default} width={16} height={16}>
              <use href="/sprite.svg#icon-default-heart"></use>
            </svg>
          </div>
          <div className={style.cardTitle}>
            <p className={style.itemTitle}>
              {car.brand}&nbsp;
              <span className={style.itemModel}>{car.model}</span>,&nbsp;
              {car.year}
            </p>
            <p>${car.rentalPrice}</p>
          </div>
          <p className={style.carInfo}>
            {car.address.split(",").slice(-2).join(" |")} | {car.rentalCompany}{" "}
            |<br /> {car.type} | {car.mileage} KM
          </p>
          <Link className={style.ItemBtn} href={`/catalog/${car.id}`}>
            Read more
          </Link>
        </li>
      ))}
    </ul>
  );
}
