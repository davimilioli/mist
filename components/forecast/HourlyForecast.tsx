import ForecastCard from "./ForecastCard";
import { formatTemp } from "@/lib/utils";
import { ForecastItem } from "@/types/Weather";

type Props = {
    hourly: ForecastItem[];
}

const HourlyForecast = ({ hourly }: Props) => {
    if (!hourly) return null;

    return (
        <>
            {hourly.map((item, index) =>
                <ForecastCard
                    key={index}
                    title={item.hour}
                    temp={`${formatTemp(item.temperature)}°`}
                    condition={item.condition}
                />
            )}
        </>
    );
}

export default HourlyForecast;