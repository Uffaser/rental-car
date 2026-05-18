import { dehydrate, QueryClient } from "@tanstack/react-query";
import CarDetailsPage from "@/components/CarDetailsPage/CarDetailsPage";
import { getCarById } from "@/lib/api/clientApi";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function CarDetails({ params }: PageProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["car", params.id],
    queryFn: () => getCarById(params.id),
  });

  return <CarDetailsPage dehydratedState={dehydrate(queryClient)} />;
}
