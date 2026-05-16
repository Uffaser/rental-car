export interface Locations {
    country: string;
    city: string;
    address: string;
}

export interface Car {
    id: string;
    year: number;
    brand: string;
    model: string;
    type: string;
    img: string;
    description: string;
    fuelConsumption: number;
    engine: string;
    rentalPrice: string;
    rentalCompany: string;
    rentalConditions: string[];
    mileage: number;
    stockNumber: number;
    features: string[];
    location: Locations;
};

export interface CarsResponse {
    cars: Car[];
    totalCars: number;
    page: number;
    totalPages: number;
};

export interface Price {
    min: number,
    max: number,
}

export interface Filter {
    brands: string[];
    price: Price;
}