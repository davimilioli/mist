import { create } from "zustand";
import { City } from "../../types/City";

type Store = {
    data: City | null;
    isLoading: boolean;
    error: string | null;
    setCity: (data: City) => void;
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