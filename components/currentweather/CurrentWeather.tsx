"use client"

import { ArrowDown, ArrowUp, CloudSun, Droplets, Thermometer, Wind } from "lucide-react"
import CurrentWeatherCard from "./CurrentWeatherCard";
import { useWeather } from "@/app/stores/weather";
import { formatTemp, formatWind } from "@/lib/utils";
import CurrentWeatherBadge from "./CurrentWeatherBadge";
import LoadingSpinner from "../LoadingSpinner";

const CurrentWeather = () => {
  const { data, isLoading } = useWeather();

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-7 space-y-6">
        {isLoading &&    
          <div className="flex flex-col items-center justify-center">
            <LoadingSpinner size={8}/>
          </div>
        } 

        {!data && !isLoading &&
          <div className="flex flex-col items-center justify-center p-10 text-gray-400 border-2 border-dashed rounded-xl">
            <CloudSun size={48} className="mb-4" />
            <h3 className="text-xl font-medium">Nenhuma cidade selecionada</h3>
            <p>Digite o nome de uma cidade no topo para ver a previsão.</p>
          </div>
        }
        
        {data && !isLoading &&
          <>
            <div className="flex items-center gap-3 text-zinc-400 font-bold uppercase text-[10px] tracking-[0.3em]">
              <CurrentWeatherBadge id={data.weather[0].id}/>
            </div>
            <div className="flex items-start">
              <h2 className="text-[140px] font-thin tracking-tighter leading-none">{formatTemp(data.main.temp)}</h2>
              <span className="text-5xl mt-6 font-light text-zinc-300">°C</span>
            </div>
            <div className="flex gap-6 text-sm font-medium ">
              <span className="flex items-center gap-1 text-zinc-500">
                <ArrowUp className="w-3 h-3 text-zinc-300"/> Max: {formatTemp(data.main.temp_max)}°
              </span>
              <span className="flex items-center gap-1 text-zinc-400">
                <ArrowDown className="w-3 h-3 text-zinc-300"/> Mín: {formatTemp(data.main.temp_min)}°
              </span>
            </div>
          </>
        }
      </div>

      <div className="lg:col-span-5 grid grid-cols-2 gap-4">
        {isLoading &&
          <LoadingSpinner size={8}/>
        }
        {data && !isLoading && 
          <>
            <CurrentWeatherCard icon={<Wind className="w-5 h-5"/>} label="Vento" value={`${formatWind(data.wind.speed)}km/h`} />
            <CurrentWeatherCard icon={<Droplets className="w-5 h-5"/>} label="Umidade" value={`${data.main.humidity}%`} />
            <CurrentWeatherCard icon={<Thermometer className="w-5 h-5"/>} label="Sensação" value={`${formatTemp(data.main.feels_like)}°`} />
          </>
        }
      </div>
    </section>
  )
}

export default CurrentWeather;