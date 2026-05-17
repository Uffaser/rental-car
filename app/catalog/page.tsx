"use client";

import CatalogForm from "@/components/CatalogForm/CatalogForm";
import CatalogList from "@/components/CatalogItem/CatalogItem";
import { getAllCars } from "@/lib/api/clientApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import style from "./page.module.css";
import { useMemo, useState } from "react";

export default function Catalog() {
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [minMileage, setMinMileage] = useState<number>();
  const [maxMileage, setMaxMileage] = useState<number>();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["cars", brand, price, minMileage, maxMileage],
    queryFn: ({ pageParam = 1 }) =>
      getAllCars(brand, price, minMileage, maxMileage, pageParam),

    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.totalPages
        ? lastPage.page + 1
        : undefined;
    },
    refetchOnWindowFocus: false,
    initialPageParam: 1,
  });

  const resetFilters = () => {
    setBrand("");
    setPrice(0);
    setMinMileage(0);
    setMaxMileage(0);
  };

  const cars = useMemo(
    () => data?.pages.flatMap((page) => page.cars) ?? [],
    [data],
  );

  return (
    <section className={style.catalog}>
      <CatalogForm
        onChangeBrand={setBrand}
        onChangePrice={setPrice}
        onChangeMinMileage={setMinMileage}
        onChangeMaxMileage={setMaxMileage}
        onClearFilters={resetFilters}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error loading cars.</p>
      ) : (
        <CatalogList cars={cars} />
      )}
      {hasNextPage && (
        <button
          className={style.catalogBtn}
          type="button"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </button>
      )}
    </section>
  );
}
