import ForecastCard from "./ForecastCard";
import { formatTemp } from "@/lib/utils";
import { NextSevenDays } from "@/types/Weather";

type Props = {
    daily: NextSevenDays[];
}

export const DailyForecast = ({ daily }: Props) => {
    return (
        <>
            {daily.map((item, index) => (
                <ForecastCard
                    key={index}
                    title={item.day}
                    temp={`${formatTemp(item.temperatureMax)}° / ${formatTemp(item.temperatureMin)}°`}
                    condition={item.condition}
                />
            ))}
        </>
    )
}

export default DailyForecast;