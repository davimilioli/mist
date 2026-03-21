"use client"

import { WeatherData } from "@/types/Weather"
import CurrentWeather from "./currentweather/CurrentWeather"
import Forecast from "./forecast/Forecast"
import { useEffect, useState } from "react";
import { weatherService } from "@/services/weather";
import WeatherEmptyState from "./states/WeatherEmptyState";
import WeatherLoadingState from "./states/WeatherLoadingState";
import WeatherErrorState from "./states/WeatherError";

type Props = {
    city?: string;
}

const WeatherContent = ({ city }: Props) => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!city) return;

        const cityReq = async () => {
            try {
                setLoading(true);
                setError(false);

                const weatherData = await weatherService.getWeatherData(city);

                if (!weatherData) {
                    setError(true);
                    return;
                }

                setWeather(weatherData);

            } catch (err) {
                console.error("Erro ao buscar clima:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        cityReq();
    }, [city]);

    if (!city) return <WeatherEmptyState />;
    if (loading) return <WeatherLoadingState size={3} message="Buscando informações de clima..." />
    if (error) return <WeatherErrorState />;
    if (!weather) return null;

    return (
        <main className="space-y-12">
            <CurrentWeather weather={weather} />
            <Forecast weather={weather} />
        </main>
    )
}

export default WeatherContent;