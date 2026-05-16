"use client";

import CatalogForm from "@/components/CatalogForm/CatalogForm";
import CatalogList from "@/components/CatalogItem/CatalogItem";
import { getAllCars } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";
import style from "./page.module.css";

export default function Catalog() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cars"],
    queryFn: getAllCars,
  });

  return (
    <section className={style.catalog}>
      <CatalogForm />
      <CatalogList cars={data?.cars} />
      <button className={style.catalogBtn} type="button">
        Load more
      </button>
    </section>
  );
}
