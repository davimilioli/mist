import ForecastCard from "./ForecastCard";
import { City } from "@/types/City";
import { formatTemp } from "@/lib/utils";

type Props = {
    currentTime: string;
    hourly: City['hourly'];
    day?: "today" | "tomorrow";
}

const HourlyForecast = ({ currentTime, hourly, day = "today" }: Props) => {
    if(!hourly) return null;

    const currentHourIndex = new Date(currentTime).getHours();
    const start = day === "today" ? currentHourIndex : 24;
    const end = day === "today" ? 24 : 48;

    const hourlyData = hourly.time.map((time, index) => ({
        hour: new Date(time).getHours().toString().padStart(2, '0') + ":00",
        temp: hourly.temperature_2m[index],
        code: hourly.weather_code[index]
    })).slice(start, end)

    return (
        <>
            {hourlyData.map((item, index) => 
                <ForecastCard
                    key={index}
                    title={item.hour}
                    temp={`${formatTemp(item.temp)}°`}
                    code={item.code}
                />
            )}
        </>
    );
}

export default HourlyForecast;