import { create } from "zustand";
import { WeatherData } from "@/types/Weather";

type Store = {
    data: WeatherData | null;
    isLoading: boolean;
    error: string | null;
    setCity: (data: WeatherData) => void;
    setLoading: (status: boolean) => void;
    setError: (msg: string | null) => void;
}

export const useWeather = create<Store>((set) => ({
    data: null,
    isLoading: false,
    error: null,
    setCity: (data) => set({ data: data }),
    setLoading: (status) => set({ isLoading: status }),
    setError: (msg) => set({ error: msg })
}));