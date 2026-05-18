import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type FavoriteState = {
  favoriteIds: string[];
  toggleFavorite: (carId: string) => void;
};

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      toggleFavorite: (carId: string) => {
        const isFavorited = get().favoriteIds.includes(carId);
        set({
          favoriteIds: isFavorited
            ? get().favoriteIds.filter((id) => id !== carId)
            : [...get().favoriteIds, carId],
        });
      },
    }),
    {
      name: "favoriteCars",
      storage:
        typeof window !== "undefined"
          ? createJSONStorage(() => window.localStorage)
          : {
              getItem: () => null,
              setItem: () => undefined,
              removeItem: () => undefined,
            },
    },
  ),
);
