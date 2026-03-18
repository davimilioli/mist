import { Card, CardContent } from "@/components/ui/card"
import { ReactNode } from "react"

type Props = {
  icon: ReactNode;
  label: string;
  value: string;
}

const CurrentWeatherCard = ({ icon, label, value }: Props) => {
  return (
    <Card className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl-[24px]">
      <CardContent className="p-6 flex flex-col gap-3 ">
        <div>{icon}</div>
        <div>
          <p className="text-xs uppercase tracking-widest font-bold text-zinc-500 dark:text-zinc-400">{label}</p>
          <p className="text-xl font-semibold">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default CurrentWeatherCard;