import { create } from "zustand";

type Store = {
    isLoading: boolean;
    error: string | null;
    setLoading: (status: boolean) => void;
    setError: (msg: string | null) => void;
}

export const useWeather = create<Store>((set) => ({
    isLoading: false,
    error: null,
    setLoading: (status) => set({ isLoading: status }),
    setError: (msg) => set({ error: msg })
}));