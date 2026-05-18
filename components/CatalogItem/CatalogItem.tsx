"use client";

import Image from "next/image";
import Link from "next/link";
import style from "./CatalogItem.module.css";
import { Car } from "@/types/car";
import { useFavoriteStore } from "@/lib/store/favoriteStore";

type Props = {
  cars: Car[] | undefined;
};

export default function CatalogItem({ cars }: Props) {
  const favoriteIds = useFavoriteStore((state) => state.favoriteIds);
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);

  return (
    <ul className={style.catalogList}>
      {cars?.map((car) => {
        const isFavorited = favoriteIds.includes(car.id);

        return (
          <li className={style.catalogCard} key={car.id}>
            <div className={style.imageWrapper}>
              <Image
                className={style.itemImg}
                src={car.img}
                alt={car.description}
                width={276}
                height={268}
                objectFit="cover"
              />
              <button
                type="button"
                className={`${style.favoriteButton} ${isFavorited ? style.favorited : ""}`}
                onClick={() => toggleFavorite(car.id)}
                aria-pressed={isFavorited}
                aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
              >
                <svg width={16} height={16}>
                  <use
                    href={`/sprite.svg#${isFavorited ? "icon-active-heart" : "icon-default-heart"}`}
                  ></use>
                </svg>
              </button>
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
              {car.location.city} | {car.location.country} | {car.rentalCompany} |
              <br /> {car.type} | {car.mileage} KM
            </p>
            <Link
              className={style.ItemBtn}
              href={`/catalog/${car.id}`}
              target="_blank"
            >
              Read more
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
