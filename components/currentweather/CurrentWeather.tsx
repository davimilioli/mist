import { ArrowDown, ArrowUp, Droplets, Sun, Thermometer, Wind } from "lucide-react"
import CurrentWeatherCard from "./CurrentWeatherCard";

const CurrentWeather = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-7 space-y-6">
        <div className="flex items-center gap-3 text-zinc-400 font-bold uppercase text-[10px] tracking-[0.3em]">
          <Sun className="w-4 h-4 text-orange-500" />
          <span>Ensolarado</span>
        </div>
        <div className="flex items-start">
          <h2 className="text-[140px] font-thin tracking-tighter leading-none">26</h2>
          <span className="text-5xl mt-6 font-light text-zinc-300">°C</span>
        </div>
        <div className="flex gap-6 text-sm font-medium text-zinc-400">
          <span className="flex items-center gap-1"><ArrowUp className="w-3 h-3 text-zinc-300"/> Máx: 28°</span>
          <span className="flex items-center gap-1"><ArrowDown className="w-3 h-3 text-zinc-300"/> Mín: 19°</span>
        </div>
      </div>

      <div className="lg:col-span-5 grid grid-cols-2 gap-4">
        <CurrentWeatherCard icon={<Wind className="w-5 h-5"/>} label="Vento" value="12 km/h" />
        <CurrentWeatherCard icon={<Droplets className="w-5 h-5"/>} label="Umidade" value="64%" />
        <CurrentWeatherCard icon={<Sun className="w-5 h-5"/>} label="UV" value="Médio" />
        <CurrentWeatherCard icon={<Thermometer className="w-5 h-5"/>} label="Sensação" value="28°" />
      </div>
    </section>
  )
}

export default CurrentWeather;