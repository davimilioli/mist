import { CloudFog, CloudLightning, CloudRain, CloudSun, Snowflake, Sun, CloudDrizzle, LucideProps } from "lucide-react";

type Props = {
  condition: string;
  showLabel?: boolean;
  iconProps?: LucideProps;
};

const WeatherStatus = ({ condition, showLabel = false, iconProps }: Props) => {

  const getWeatherInfo = (condition: string) => {
    if (condition === "Ensolarado") return { icon: Sun, label: "Ensolarado", color: "text-orange-500" };
    if (condition === "Nublado") return { icon: CloudSun, label: "Nublado", color: "text-gray-400" };
    if (condition === "Neblina") return { icon: CloudFog, label: "Neblina", color: "text-zinc-400" };
    if (condition === "Chuvisco") return { icon: CloudDrizzle, label: "Chuvisco", color: "text-sky-300" };
    if (condition === "Chuva") return { icon: CloudRain, label: "Chuva", color: "text-sky-500" };
    if (condition === "Neve") return { icon: Snowflake, label: "Neve", color: "text-sky-200" };
    if (condition === "Tempestade") return { icon: CloudLightning, label: "Tempestade", color: "text-yellow-500" };
    return { icon: CloudSun, label: "Nublado", color: "text-zinc-400" };
  }

  const { icon: Icon, label, color } = getWeatherInfo(condition);

  return (
    <div className="flex items-center gap-2">
      <Icon className={`${color} ${iconProps?.className}`} {...iconProps} />
      {showLabel && <span className={color}>{label}</span>}
    </div>
  );
};

export default WeatherStatus;