import { City } from "@/types/City";
import ForecastCard from "./ForecastCard";
import { formatTemp } from "@/lib/utils";

type Props = {
    daily: City['daily'];
}

export const DailyForecast = ({ daily }: Props) => {
    if(!daily) return null;

    const dailyData = daily.time.map((date, index) => {
        const dayDate = new Date(date + "T00:00:00");
        let dayName = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' }).format(dayDate);
        dayName = dayName.charAt(0).toUpperCase() + dayName.slice(1).replace('.', '');

        return {
            day: dayName,
            max: daily.temperature_2m_max[index],
            min: daily.temperature_2m_min[index],
            code: daily.weather_code[index]
        }
    })

    return (
        <>
            {dailyData.map((item, index) => 
                <ForecastCard 
                    key={index}
                    title={item.day}
                    temp={`${formatTemp(item.max)}° / ${formatTemp(item.min)}°`}
                    code={item.code}
                />
            )}
        </>
    )
}

export default DailyForecast;