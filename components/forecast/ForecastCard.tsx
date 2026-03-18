import { Card, CardContent } from "@/components/ui/card"


const ForecastCard = ({ day, temp, icon, active = false }: { day: string, temp: string, icon: React.ReactNode, active?: boolean }) => {
  return (
    <Card className={`bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl-[28px] transition-all duration-300 cursor-pointer
      ${active ? '' : ''} 
    `}>
      <CardContent className="p-6 flex flex-col items-center justify-between min-h-[160px]">
        <span className={`text-sm font-semibold ${active ? '' : 'text-zinc-500 dark:text-zinc-400'}`}>{day}</span>
        <div className="my-2">{icon}</div>
        <span className="text-2xl font-bold tracking-tight">{temp}</span>
      </CardContent>
    </Card>
  )
}

export default ForecastCard;