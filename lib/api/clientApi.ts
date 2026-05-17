import { Car, CarsResponse, Filter } from "@/types/car"
import { nextServer } from "./api"
import { DetailsFormValues } from "@/components/CarDetailsForm/CarDetailsForm";

export const perPage = 12

export const getAllCars = async (
  brand: string,
  price: number,
  minMileage: number | undefined,
  maxMileage: number | undefined,
  page: number = 1,
) => {
  const { data } = await nextServer.get<CarsResponse>("/cars", {
    params: {
      perPage: perPage,
      page,
      brand: brand,
      price: price,
      minMileage: minMileage,
      maxMileage: maxMileage,
    },
  });

  return data;
}

export const getCarById = async (id: string) => {
    const { data } = await nextServer.get<Car>(`/cars/${id}`);

    return data
}

export const getFilter = async () => {
    const { data } = await nextServer.get<Filter>('/cars/filters');

    return data
}

export const postBookingCar = async (id:string, payload: DetailsFormValues) => {
    const { data } = await nextServer.post<DetailsFormValues>(`/cars/${id}/booking-requests`, payload);
    return data;
}