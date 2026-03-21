"use client"

import { ArrowDown, ArrowUp, CloudSun, Droplets, Thermometer, Wind } from "lucide-react"
import CurrentWeatherCard from "./CurrentWeatherCard";
import { useWeather } from "@/app/stores/weather";
import { formatTemp, formatWind } from "@/lib/utils";
import LoadingSpinner from "../states/WeatherLoading";
import WeatherStatus from "../WeatherStatus";
import { WeatherData } from "@/types/Weather";

type Props = {
  weather: WeatherData;
}

const CurrentWeather = ({ weather }: Props) => {
  if (!weather) return null;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-7 space-y-6">

        {weather.temperatureCurrent &&
          <>
            <div className="flex items-center gap-3 text-zinc-400 font-bold uppercase text-[10px] tracking-[0.3em]">
              <WeatherStatus
                condition={weather.temperatureCurrent.condition}
                showLabel={true}
              />
            </div>
            <div className="flex items-start">
              <h2 className="text-[140px] font-thin tracking-tighter leading-none">{formatTemp(weather.temperatureCurrent.temperature)}</h2>
              <span className="text-5xl mt-6 font-light text-zinc-300">°C</span>
            </div>
            <div className="flex gap-6 text-sm font-medium ">
              <span className="flex items-center gap-1 text-zinc-500">
                <ArrowUp className="w-3 h-3 text-zinc-300" /> Max: {formatTemp(weather.temperatureCurrent.temperatureMax)}°
              </span>
              <span className="flex items-center gap-1 text-zinc-400">
                <ArrowDown className="w-3 h-3 text-zinc-300" /> Mín: {formatTemp(weather.temperatureCurrent.temperatureMin)}°
              </span>
            </div>
          </>
        }
      </div>

      <div className="lg:col-span-5 grid grid-cols-2 gap-4">
        {weather.temperatureCurrent &&
          <>
            <CurrentWeatherCard icon={<Wind className="w-5 h-5" />} label="Vento" value={`${formatWind(weather.temperatureCurrent.windSpeed)}km/h`} />
            <CurrentWeatherCard icon={<Droplets className="w-5 h-5" />} label="Umidade" value={`${weather.temperatureCurrent.humidity}%`} />
            <CurrentWeatherCard icon={<Thermometer className="w-5 h-5" />} label="Sensação" value={`${formatTemp(weather.temperatureCurrent.temperature)}°`} />
          </>
        }
      </div>
    </section>
  )
}

export default CurrentWeather;