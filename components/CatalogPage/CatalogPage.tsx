"use client";

import { HydrationBoundary, useInfiniteQuery } from "@tanstack/react-query";
import type { DehydratedState } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import CatalogForm from "@/components/CatalogForm/CatalogForm";
import CatalogList from "@/components/CatalogItem/CatalogItem";
import { getAllCars } from "@/lib/api/clientApi";
import style from "@/app/catalog/page.module.css";

interface Props {
  dehydratedState?: DehydratedState | null;
}

export default function CatalogPage({ dehydratedState }: Props) {
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [minMileage, setMinMileage] = useState<number>();
  const [maxMileage, setMaxMileage] = useState<number>();

  const { data, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["cars", brand, price, minMileage, maxMileage],
      queryFn: ({ pageParam = 1 }) =>
        getAllCars(brand, price, minMileage, maxMileage, pageParam),
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 1000 * 60 * 5,
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
    <HydrationBoundary state={dehydratedState}>
      <section className={`${style.catalog} container`}>
        <CatalogForm
          onChangeBrand={setBrand}
          onChangePrice={setPrice}
          onChangeMinMileage={setMinMileage}
          onChangeMaxMileage={setMaxMileage}
          onClearFilters={resetFilters}
        />
        {isError ? <p>Error loading cars.</p> : <CatalogList cars={cars} />}
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
    </HydrationBoundary>
  );
}
