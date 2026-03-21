"use client"

import { WeatherData } from "@/types/Weather"
import CurrentWeather from "./currentweather/CurrentWeather"
import Forecast from "./forecast/Forecast"
import EmptyState from "./states/EmptyState";
import { useEffect, useState } from "react";
import { weatherService } from "@/services/weather";
import LoadingSpinner from "./states/WeatherLoading";

type Props = {
    city?: string;
}

const WeatherContent = ({ city }: Props) => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!city) return;

        const cityReq = async () => {
            setLoading(true);
            const weatherData = await weatherService.getWeatherData(city);

            setWeather(weatherData);
            setLoading(false);
        }

        cityReq();
    }, [city]);

    if (!city) return <EmptyState />;

    if (loading) {
        return (
            <LoadingSpinner size={3} message="Buscando informações de clima..." />
        )
    }

    if (!weather) return null;

    return (
        <main className="space-y-12">
            <CurrentWeather weather={weather} />
            <Forecast weather={weather} />
        </main>
    )
}

export default WeatherContent;