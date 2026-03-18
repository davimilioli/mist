import { Card, CardContent } from "@/components/ui/card"
import WeatherStatus from "../WeatherStatus";

type Props = {
  title: string;
  temp: string;
  code: number;
  active?: boolean
}

const ForecastCard = ({ title, temp, code, active }: Props) => {
  return (
    <Card className={`bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl-[28px] transition-all duration-300 cursor-pointer`}>
      <CardContent className="p-6 flex flex-col items-center justify-between min-h-[160px]">
        <span className={`text-sm font-semibold text-zinc-500 dark:text-zinc-400`}>{title}</span>
        <div className="my-2">
          <WeatherStatus code={code}/>
        </div>
        <span className="text-xl font-bold tracking-tight">{temp}</span>
      </CardContent>
    </Card>
  )
}

export default ForecastCard;