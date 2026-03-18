"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useWeather } from "@/app/stores/weather"
import HourlyForecast from "./HourlyForecast"
import { useState } from "react"

const Forecast = () => {
  const [activeTab, setActiveTab] = useState('tomorrow')
  const { data } = useWeather();

  return (
    <section className="space-y-8">
      <Tabs className="w-full" 
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <div className="flex items-center justify-between mb-8">
          <TabsList className="bg-transparent gap-8 p-0 h-auto">
            {["Today", "Tomorrow", "Next 7 days"].map((tab) => (
              <TabsTrigger 
                key={tab}
                value={tab.toLowerCase().replace(/ /g, "-")} 
                className="data-[state=active]:bg-transparent data-[state=active]:text-zinc-950 data-[state=active]:shadow-none text-zinc-400 font-sans font-bold p-4 transition-all hover:cursor-pointer rounded-xl"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="hidden sm:flex bg-zinc-100 p-1 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 gap-1">
            <Button variant="secondary" size="sm" className="rounded-xl bg-white-500 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 shadow-sm h-8 px-5 text-xs font-bold">Previsão</Button>
            <Button variant="ghost" size="sm" className="rounded-xl text-zinc-400 h-8 px-5 text-xs font-bold">Qualidade do ar</Button>
          </div>
        </div>
        
        <TabsContent value="today" className="mt-0 outline-none">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {data?.hourly && <HourlyForecast currentTime={data.current.time} hourly={data.hourly}/> }
          </div>
        </TabsContent> 

        <TabsContent value="tomorrow" className="mt-0 outline-none">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {data?.hourly && <HourlyForecast currentTime={data.current.time} hourly={data.hourly} day="tomorrow"/> }
          </div>
        </TabsContent> 
        
      </Tabs>
    </section>
  )
}

export default Forecast;