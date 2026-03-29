import WeatherLoadingState from "@/components/states/WeatherLoadingState";

export default function Loading() {
    return <WeatherLoadingState size={3} message="Buscando informações de clima..." />
}