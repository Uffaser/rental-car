import { CarsResponse } from "@/types/car"
import { nextServer } from "./api"

export const getAllCars = async () => {
    const {data} = await nextServer.get<CarsResponse>('cars');

    return data
}