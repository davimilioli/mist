"use server"

import { revalidateTag } from "next/cache";

export async function refreshWeatherData(city: string) {
    const tag = `weather-${city.toLocaleLowerCase()}`;
    revalidateTag(tag, "max");
}