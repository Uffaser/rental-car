"use client";

import CarDetailsForm from "@/components/CarDetailsForm/CarDetailsForm";
import { getCarById } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import style from "./page.module.css";

export default function CarDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["car"],
    queryFn: () => getCarById(id),
  });

  if (!data) return;

  return (
    <section className={style.carDetails}>
      <div>
        <Image
          className={style.carImg}
          src={data?.img}
          alt={data?.description}
          width={640}
          height={512}
        />
        <CarDetailsForm />
      </div>
      <div>
        <div className={style.carDetailsTitleBox}>
          <h2 className={style.carDetailsTitle}>
            {data?.brand} {data?.model}, {data?.year}
          </h2>
          <p className={style.carDetailsId}>Id: {data?.id.slice(-4)}</p>
        </div>
        <div>
          <div>
            <svg width={16} height={16}>
              <use href="/sprite.svg#icon-location"></use>
            </svg>
            <p className={style.carDetailsAddress}>
              {data?.address.split(",").slice(-2).join(",")}
            </p>
          </div>
          <p className={style.carDetailsMileage}>Mileage: {data?.mileage} km</p>
        </div>
        <p className={style.carDetailsPrice}>${data?.rentalPrice}</p>
        <p className={style.carDetailsDescr}>{data?.description}</p>
        <h3 className={style.carDetailsInfoTitle}>Rental Conditions: </h3>
        <ul>
          {data?.rentalConditions.map((condition) => (
            <li key={condition}>
              <svg width={16} height={16}>
                <use href="/sprite.svg#icon-check-circle"></use>
              </svg>
              <p>{condition}</p>
            </li>
          ))}
        </ul>
        <h3 className={style.carDetailsInfoTitle}>Car Specifications:</h3>
        <ul>
          <li>
            <svg width={16} height={16}>
              <use href="/sprite.svg#icon-calendar"></use>
            </svg>
            <p>Year: {data?.year}</p>
          </li>
          <li>
            <svg width={16} height={16}>
              <use href="/sprite.svg#icon-car"></use>
            </svg>
            <p>Type: {data?.type}</p>
          </li>
          <li>
            <svg width={16} height={16}>
              <use href="/sprite.svg#icon-fuel-pump"></use>
            </svg>
            <p>Fuel Consumption: {data?.fuelConsumption}</p>
          </li>
          <li>
            <svg width={16} height={16}>
              <use href="/sprite.svg#icon-gear"></use>
            </svg>
            <p>Engine Size: {data?.engineSize}</p>
          </li>
        </ul>
        <h3 className={style.carDetailsInfoTitle}>
          Accessories and functionalities:
        </h3>
        <ul>
          {data?.accessories.map((accessory) => (
            <li key={accessory}>
              <svg width={16} height={16}>
                <use href="/sprite.svg#icon-check-circle"></use>
              </svg>
              <p>{accessory}</p>
            </li>
          ))}
          {data?.functionalities.map((functionality) => (
            <li key={functionality}>
              <svg width={16} height={16}>
                <use href="/sprite.svg#icon-check-circle"></use>
              </svg>
              <p>{functionality}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
