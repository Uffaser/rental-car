import { Car, CarsResponse, Filter } from "@/types/car"
import { nextServer } from "./api"

export const perPage = 12

export const getAllCars = async () => {
    const { data } = await nextServer.get<CarsResponse>('/cars', {
        params: {
        perPage: perPage
    }})

    return data
}

export const getCarById = async (id: string) => {
    const { data } = await nextServer.get<Car>(`/cars/${id}`);

    return data
}

export const getFilter = async () => {
    const { data } = await nextServer.get<Filter>('/cars/filters');

    return data
}