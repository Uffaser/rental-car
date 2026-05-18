import { Car, CarsResponse, Filter, NewBooking } from "@/types/car"
import { nextServer } from "./api"
import axios from "axios";

export const perPage = 12

export const server = axios.create({
    baseURL: 'https://car-rental-api.goit.study',
})

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

export const postBookingCar = async (id:string, payload: NewBooking) => {
    const { data } = await server.post<NewBooking>(`/cars/${id}/booking-requests`, payload);
    
    return data;
}