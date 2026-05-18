# 🚗 RentalCar — Car Rental Service

## Live Demo

(Add a demo link here if available)

## 📖 Description

RentalCar is a modern frontend application for a car rental company. Users can browse a catalog of available vehicles, apply flexible filters, view detailed specifications for each car, and submit rental requests.

The project is built with Next.js (App Router) and TypeScript, with a focus on performance, SEO, and a smooth user experience.

## ✨ Main Features

- **Home Page:** a bright hero section with a clear call-to-action to start browsing.
- **Interactive Catalog:** a dynamic car list loaded from a REST API.
- **Advanced Filtering:** filter by:
  - brand (single selection)
  - price (single selection / range)
  - mileage (min/max)
- **Load More Pagination:** "Load More" functionality using `useInfiniteQuery` (TanStack Query) that preserves active filters.
- **Dynamic Car Pages:** `/catalog/[carId]` pages with photos, specs, and a rental request form.
- **SEO Optimization:** dynamic metadata and OpenGraph tags for car detail pages.

## 🛠️ Tech Stack

- Framework: Next.js (App Router)
- Language: TypeScript
- Data fetching / caching: TanStack Query (React Query)
- State management: Zustand (if used)
- Styling: CSS Modules
- Icons: SVG Sprite

## 🚀 Installation and Usage

### Prerequisites

- Node.js installed (recommended v16+ or newer)

### Steps

1. Clone the repository

```bash
git clone https://github.com/Uffaser/rental-car.git

cd rental-car
```

2. Install dependencies

```bash
npm install
# or
# yarn install
```

3. Configure environment variables

Create a `.env` file in the project root and add (example):

```env
NEXT_BACKEND_URL=https://car-rental-api.goit.study
```

4. Start the development server

```bash
npm run dev
# or
# yarn dev
```

Open `https://rental-car-pied-nine.vercel.app/` in your browser.

### Build and production

```bash
npm run build
npm run start
```

## 👤 Author

- Author: Maksym Herasymenko (Uffaser)
- GitHub: https://github.com/Uffaser

This project was created as a test assignment.
