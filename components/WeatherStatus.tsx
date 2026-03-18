import { CloudFog, CloudLightning, CloudRain, CloudSun, Snowflake, Sun, CloudDrizzle, LucideProps } from "lucide-react";

type Props = {
  code: number;
  showLabel?: boolean;
  useColor?: boolean;
  iconProps?: LucideProps;
};

const WeatherStatus = ({ code,  showLabel = false,  useColor = false, iconProps }: Props) => {

  const getWeatherInfo = (c: number) => {
    if (c === 0) return { icon: Sun, label: "Ensolarado", color: "text-orange-500" };
    if (c >= 1 && c <= 3) return { icon: CloudSun, label: "Nublado", color: "text-gray-400" };
    if (c === 45 || c === 48) return { icon: CloudFog, label: "Neblina", color: "text-zinc-400" };
    if (c >= 51 && c <= 55) return { icon: CloudDrizzle, label: "Chuvisco", color: "text-blue-300" };
    if ((c >= 61 && c <= 65) || (c >= 80 && c <= 82)) return { icon: CloudRain, label: "Chuva", color: "text-blue-500" };
    if ((c >= 71 && c <= 77) || (c === 85 || c === 86)) return { icon: Snowflake, label: "Neve", color: "text-blue-200" };
    if (c >= 95 && c <= 99) return { icon: CloudLightning, label: "Tempestade", color: "text-yellow-500" };
    return { icon: CloudSun, label: "Nublado", color: "text-zinc-400" };
  };

  const { icon: Icon, label, color } = getWeatherInfo(code);
  const finalColor = useColor ? color : "";

  return (
    <div className="flex items-center gap-2">
      <Icon className={`${finalColor} ${iconProps?.className}`} {...iconProps} />
      {showLabel && <span className={finalColor}>{label}</span>}
    </div>
  );
};

export default WeatherStatus;