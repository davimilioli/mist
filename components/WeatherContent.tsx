import { WeatherData } from "@/types/Weather"
import CurrentWeather from "./currentweather/CurrentWeather"
import Forecast from "./forecast/Forecast"
import WeatherEmptyState from "./states/WeatherEmptyState";
import WeatherErrorState from "./states/WeatherError";

type Props = {
    city?: string;
    weather?: WeatherData | null;
    error?: boolean
}

const WeatherContent = ({ city, weather, error }: Props) => {

    if (!city) return <WeatherEmptyState />;
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