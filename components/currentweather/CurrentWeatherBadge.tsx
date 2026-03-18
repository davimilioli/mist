import { CloudFog, CloudLightning, CloudRain, CloudSun, Snowflake, Sun } from "lucide-react"

type Props = {
    id: number;
}

const CurrentWeatherBadge = ({id}: Props) => {

    const getWeatherInfo = (id: number) => {
        if (id === 800) return { icon: Sun, label: "Ensolarado", color: "text-orange-500" };
        if (id >= 801 && id <= 804) return { icon: CloudSun, label: "Nublado", color: "text-gray-400" };
        if (id >= 500 && id <= 531) return { icon: CloudRain, label: "Chuva", color: "text-blue-500" };
        if (id >= 200 && id <= 232) return { icon: CloudLightning, label: "Tempestade", color: "text-yellow-500" };
        if (id >= 600 && id <= 622) return { icon: Snowflake, label: "Neve", color: "text-blue-200" };
        return { icon: CloudFog, label: "Neblina", color: "text-zinc-400" };
    }

    const { icon: Icon, label, color } = getWeatherInfo(id);

    return (
        <>
            <Icon className={`w-4 h-4 ${color}`} />
            <span>{label}</span>
        </>
    )
}

export default CurrentWeatherBadge;