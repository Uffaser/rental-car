"use client";

import { HydrationBoundary, useQuery } from "@tanstack/react-query";
import type { DehydratedState } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Image from "next/image";
import Loading from "@/components/Loading/Loading";
import CarDetailsForm from "@/components/CarDetailsForm/CarDetailsForm";
import { getCarById } from "@/lib/api/clientApi";
import style from "@/app/catalog/[id]/page.module.css";

interface Props {
  dehydratedState?: DehydratedState | null;
}

export default function CarDetailsPage({ dehydratedState }: Props) {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["car", id],
    queryFn: () => getCarById(id),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <Loading message="Loading car details..." />;
  }

  if (isError) {
    return <p>Error loading car details.</p>;
  }

  if (!data) {
    return <p>No car details found.</p>;
  }

  return (
    <HydrationBoundary state={dehydratedState}>
      <section className={`${style.carDetails} container`}>
        <div>
          <Image
            className={style.carImg}
            src={data.img}
            alt={data.description}
            width={640}
            height={512}
          />
          <CarDetailsForm id={id} />
        </div>
        <div className={style.carDetailsInfoBox}>
          <div className={style.carDetailsTitleBox}>
            <h2 className={style.carDetailsTitle}>
              {data.brand} {data.model}, {data.year}
            </h2>
            <p className={style.carDetailsId}>Id: {data.stockNumber}</p>
          </div>
          <div className={style.mainInfoBox}>
            <div className={style.locationBox}>
              <svg width={16} height={16}>
                <use href="/sprite.svg#icon-location"></use>
              </svg>
              <p className={style.carDetailsAddress}>
                {data.location.city}, {data.location.country}
              </p>
            </div>
            <p className={style.carDetailsMileage}>
              Mileage: {data.mileage} km
            </p>
          </div>
          <p className={style.carDetailsPrice}>${data.rentalPrice}</p>
          <p className={style.carDetailsDescr}>{data.description}</p>
          <h3 className={style.carDetailsInfoTitle}>Rental Conditions: </h3>
          <ul className={style.carInfoList}>
            {data.rentalConditions.map((condition) => (
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
              <p>Year: {data.year}</p>
            </li>
            <li className={style.carInfoItem}>
              <svg width={16} height={16}>
                <use href="/sprite.svg#icon-car"></use>
              </svg>
              <p>Type: {data.type}</p>
            </li>
            <li className={style.carInfoItem}>
              <svg width={16} height={16}>
                <use href="/sprite.svg#icon-fuel-pump"></use>
              </svg>
              <p>Fuel Consumption: {data.fuelConsumption}</p>
            </li>
            <li className={style.carInfoItem}>
              <svg width={16} height={16}>
                <use href="/sprite.svg#icon-gear"></use>
              </svg>
              <p>Engine Size: {data.engine}</p>
            </li>
          </ul>
          <h3 className={style.carDetailsInfoTitle}>
            Accessories and functionalities:
          </h3>
          <ul className={style.carInfoList}>
            {data.features.map((feature) => (
              <li className={style.carInfoItem} key={feature}>
                <svg width={16} height={16}>
                  <use href="/sprite.svg#icon-check-circle"></use>
                </svg>
                <p>{feature}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </HydrationBoundary>
  );
}
