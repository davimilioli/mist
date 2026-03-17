import { Header } from "@/components/layout/Header"
import Forecast from "@/components/forecast/Forecast"
import CurrentWeather from "@/components/currentweather/CurrentWeather"

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col gap-12">
      <Header />
      <main className="space-y-12">
        <CurrentWeather />
        <Forecast />
      </main>
    </div>
  )
}