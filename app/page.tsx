import GithubButtons from "@/components/GithubButtons";
import { Header } from "@/components/layout/Header"
import WeatherContent from "@/components/WeatherContent"
import { unslugify } from "@/lib/utils";
import { weatherService } from "@/services/weather";

type Props = {
  searchParams: Promise<{
    city?: string;
  }>
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const city = params.city;

  let weatherData = null;
  let hasError = false;

  if (city) {
    const citySearch = unslugify(city);

    try {
      weatherData = await weatherService.getWeatherData(citySearch);

      if (!weatherData) {
        hasError = true;
      }
    } catch (err) {
      console.error("Erro ao buscar clima no servidor:", err);
      hasError = true;
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-12 flex flex-col gap-12">
      <Header city={city} />
      <WeatherContent
        city={city}
        weather={weatherData}
        error={hasError}
      />
      <GithubButtons />
    </div>
  )
}