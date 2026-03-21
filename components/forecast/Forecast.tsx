"use client"

import { Tabs, TabsList } from "@/components/ui/tabs"
import HourlyForecast from "./HourlyForecast"
import { useState } from "react"
import DailyForecast from "./DailyForecast"
import ForecastTabs from "./ForecastTabs"
import ForecastTabContent from "./ForecastTabContent"
import { WeatherData } from "@/types/Weather";

type Props = {
  weather: WeatherData;
}

const Forecast = ({ weather }: Props) => {
  const [activeTab, setActiveTab] = useState('today')

  if (!weather) return null;

  const tabs = [
    { label: "Hoje", slug: "today" },
    { label: "Amanhã", slug: "tomorrow" },
    { label: "Próximos 7 dias", slug: "next-7-days" },
  ];

  return (
    <section className="space-y-8">
      <Tabs className="w-full"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <div className="flex items-center justify-between mb-3">
          <TabsList className="bg-transparent p-0 h-auto w-full md:w-auto gap-0 md:gap-5 justify-center md:justify-start">
            {tabs.map((tab) => (
              <ForecastTabs key={tab.slug} value={tab.slug} label={tab.label} />
            ))}
          </TabsList>


          {/*           <div className="hidden sm:flex bg-zinc-100 p-1 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 gap-1">
            <Button variant="secondary" size="sm" className="rounded-xl bg-white-500 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 shadow-sm h-8 px-5 text-xs font-bold">Previsão</Button>
            <Button variant="ghost" size="sm" className="rounded-xl text-zinc-400 h-8 px-5 text-xs font-bold">Qualidade do ar</Button>
          </div> */}
        </div>

        <hr className="w-full border-zinc-200 dark:border-zinc-800 hidden md:block mb-3" />

        <ForecastTabContent value="today">
          {weather.hourlyForecast.today && <HourlyForecast hourly={weather.hourlyForecast.today} />}
        </ForecastTabContent>
        <ForecastTabContent value="tomorrow">
          {weather.hourlyForecast.tomorrow && <HourlyForecast hourly={weather.hourlyForecast.tomorrow} />}
        </ForecastTabContent>
        <ForecastTabContent value="next-7-days">
          {weather.hourlyForecast.nextSevenDays && <DailyForecast daily={weather.hourlyForecast.nextSevenDays} />}
        </ForecastTabContent>
      </Tabs>
    </section>
  )
}

export default Forecast;