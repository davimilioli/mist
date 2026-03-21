import { Header } from "@/components/layout/Header"
import WeatherContent from "@/components/WeatherContent"

type Props = {
  searchParams: Promise<{
    city?: string;
  }>
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col gap-12">
      <Header />
      <WeatherContent city={params.city} />
    </div>
  )
}