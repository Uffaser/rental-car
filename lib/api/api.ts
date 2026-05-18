import axios from "axios";

export const nextServer = axios.create({
    baseURL: 'https://rental-car-pied-nine.vercel.app/api',
})