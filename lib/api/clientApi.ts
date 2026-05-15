import { Car, CarsResponse } from "@/types/car"
import { nextServer } from "./api"
import axios from "axios";

export const server = axios.create({
    baseURL: 'https://car-rental-api.goit.global',
})

export const getAllCars = async () => {
    const { data } = await nextServer.get<CarsResponse>('/cars');

    return data
}

export const getCarById = async (id: string) => {
    const { data } = await nextServer.get<Car>(`/cars/${id}`);

    return data
}