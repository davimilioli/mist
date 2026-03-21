"use client"

import { Tabs, TabsList } from "@/components/ui/tabs"
import { useWeather } from "@/app/stores/weather"
import HourlyForecast from "./HourlyForecast"
import { useState } from "react"
import DailyForecast from "./DailyForecast"
import ForecastTabs from "./ForecastTabs"
import ForecastTabContent from "./ForecastTabContent"

const Forecast = () => {
  const [activeTab, setActiveTab] = useState('today')
  const { data } = useWeather();

  if (!data) return null;

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
        <div className="flex items-center justify-between mb-8">
          <TabsList className="bg-transparent gap-8 p-0 h-auto">
            {tabs.map((tab) => (
              <ForecastTabs key={tab.slug} value={tab.slug} label={tab.label} />
            ))}
          </TabsList>

          {/*           <div className="hidden sm:flex bg-zinc-100 p-1 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 gap-1">
            <Button variant="secondary" size="sm" className="rounded-xl bg-white-500 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 shadow-sm h-8 px-5 text-xs font-bold">Previsão</Button>
            <Button variant="ghost" size="sm" className="rounded-xl text-zinc-400 h-8 px-5 text-xs font-bold">Qualidade do ar</Button>
          </div> */}
        </div>

        <ForecastTabContent value="today">
          {data.hourlyForecast.today && <HourlyForecast hourly={data.hourlyForecast.today} />}
        </ForecastTabContent>
        <ForecastTabContent value="tomorrow">
          {data.hourlyForecast.tomorrow && <HourlyForecast hourly={data.hourlyForecast.tomorrow} />}
        </ForecastTabContent>
        <ForecastTabContent value="next-7-days">
          {data.hourlyForecast.nextSevenDays && <DailyForecast daily={data.hourlyForecast.nextSevenDays} />}
        </ForecastTabContent>
      </Tabs>
    </section>
  )
}

export default Forecast;