"use client";

import CatalogForm from "@/components/CatalogForm/CatalogForm";
import CatalogList from "@/components/CatalogItem/CatalogList";
import { getAllCars } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";

export default function Catalog() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cars"],
    queryFn: getAllCars,
  });

  return (
    <section>
      <CatalogForm />
      <CatalogList cars={data?.cars} />
    </section>
  );
}
