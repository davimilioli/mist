import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
   recentCities: string[];
   addCityHistory: (city: string) => void;
   clearHistory: () => void;
}

const STORAGE_KEY = 'history-storage';

export const useHistory = create<Store>()(
    persist(
        (set) => ({
            recentCities: [],
            addCityHistory: (city) => set((state) => ({
                recentCities: [city, ...state.recentCities.filter(c => c !== city)].slice(0, 5)
            })),
            clearHistory: () => set({ recentCities: [] }),
        }),
        { name: STORAGE_KEY },
    )
)