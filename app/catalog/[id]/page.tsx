"use client";

import CarDetailsForm from "@/components/CarDetailsForm/CarDetailsForm";
import { getCarById } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import style from "./page.module.css";
import "../../globals.css";

export default function CarDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["car"],
    queryFn: () => getCarById(id),
  });

  if (!data) return;

  return (
    <section className={`${style.carDetails} container`}>
      <div>
        <Image
          className={style.carImg}
          src={data?.img}
          alt={data?.description}
          width={640}
          height={512}
        />
        <CarDetailsForm id={id} />
      </div>
      <div className={style.carDetailsInfoBox}>
        <div className={style.carDetailsTitleBox}>
          <h2 className={style.carDetailsTitle}>
            {data?.brand} {data?.model}, {data?.year}
          </h2>
          <p className={style.carDetailsId}>Id: {data.stockNumber}</p>
        </div>
        <div className={style.mainInfoBox}>
          <div className={style.locationBox}>
            <svg width={16} height={16}>
              <use href="/sprite.svg#icon-location"></use>
            </svg>
            <p className={style.carDetailsAddress}>
              {data?.location.city}, {data?.location.country}
            </p>
          </div>
          <p className={style.carDetailsMileage}>Mileage: {data?.mileage} km</p>
        </div>
        <p className={style.carDetailsPrice}>${data?.rentalPrice}</p>
        <p className={style.carDetailsDescr}>{data?.description}</p>
        <h3 className={style.carDetailsInfoTitle}>Rental Conditions: </h3>
        <ul className={style.carInfoList}>
          {data?.rentalConditions.map((condition) => (
            <li className={style.carInfoItem} key={condition}>
              <svg width={16} height={16}>
                <use href="/sprite.svg#icon-check-circle"></use>
              </svg>
              <p>{condition}</p>
            </li>
          ))}
        </ul>
        <h3 className={style.carDetailsInfoTitle}>Car Specifications:</h3>
        <ul className={style.carInfoList}>
          <li className={style.carInfoItem}>
            <svg width={16} height={16}>
              <use href="/sprite.svg#icon-calendar"></use>
            </svg>
            <p>Year: {data?.year}</p>
          </li>
          <li className={style.carInfoItem}>
            <svg width={16} height={16}>
              <use href="/sprite.svg#icon-car"></use>
            </svg>
            <p>Type: {data?.type}</p>
          </li>
          <li className={style.carInfoItem}>
            <svg width={16} height={16}>
              <use href="/sprite.svg#icon-fuel-pump"></use>
            </svg>
            <p>Fuel Consumption: {data?.fuelConsumption}</p>
          </li>
          <li className={style.carInfoItem}>
            <svg width={16} height={16}>
              <use href="/sprite.svg#icon-gear"></use>
            </svg>
            <p>Engine Size: {data?.engine}</p>
          </li>
        </ul>
        <h3 className={style.carDetailsInfoTitle}>
          Accessories and functionalities:
        </h3>
        <ul className={style.carInfoList}>
          {data?.features.map((features) => (
            <li className={style.carInfoItem} key={features}>
              <svg width={16} height={16}>
                <use href="/sprite.svg#icon-check-circle"></use>
              </svg>
              <p>{features}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
