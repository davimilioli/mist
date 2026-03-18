import { 
  CloudFog, 
  CloudLightning, 
  CloudRain, 
  CloudSun,
  Snowflake, 
  Sun,
  CloudDrizzle
} from "lucide-react"

type Props = {
    id: number;
}

const CurrentWeatherBadge = ({id}: Props) => {

    const getWeatherInfo = (code: number) => {
        if (code === 0) return { icon: Sun, label: "Ensolarado", color: "text-orange-500" };
        if (code >= 1 && code <= 3) return { icon: CloudSun, label: "Nublado", color: "text-gray-400" };
        if (code === 45 || code === 48) return { icon: CloudFog, label: "Neblina", color: "text-zinc-400" };
        if (code >= 51 && code <= 55) return { icon: CloudDrizzle, label: "Chuvisco", color: "text-blue-300" };
        if ((code >= 61 && code <= 65) || (code >= 80 && code <= 82)) return { icon: CloudRain, label: "Chuva", color: "text-blue-500" };
        if ((code >= 71 && code <= 77) || (code === 85 || code === 86)) return { icon: Snowflake, label: "Neve", color: "text-blue-200" };
        if (code >= 95 && code <= 99) return { icon: CloudLightning, label: "Tempestade", color: "text-yellow-500" };
        return { icon: CloudSun, label: "Nublado", color: "text-zinc-400" };
    }

    const { icon: Icon, label, color } = getWeatherInfo(id);

    return (
        <div className="flex items-center gap-2">
            <Icon className={`w-4 h-4 ${color}`} />
            <span className={color}>{label}</span>
        </div>
    )
}

export default CurrentWeatherBadge;