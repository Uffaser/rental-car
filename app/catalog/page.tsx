import { dehydrate, QueryClient } from "@tanstack/react-query";
import CatalogPage from "@/components/CatalogPage/CatalogPage";
import { getAllCars, getFilter } from "@/lib/api/clientApi";

export default async function Catalog() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["filter"],
      queryFn: getFilter,
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: ["cars", "", 0, undefined, undefined],
      queryFn: ({ pageParam = 1 }) =>
        getAllCars("", 0, undefined, undefined, pageParam),
      getNextPageParam: (lastPage: { page: number; totalPages: number }) =>
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
      initialPageParam: 1,
    }),
  ]);

  return <CatalogPage dehydratedState={dehydrate(queryClient)} />;
}
