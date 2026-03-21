import { AlertCircle } from "lucide-react"

const WeatherErrorState = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <AlertCircle className="w-10 h-10 text-red-500 mb-4" />

            <h3 className="text-lg font-semibold">
                Não foi possível carregar o clima
            </h3>

            <p className="text-sm text-muted-foreground max-w-sm">
                Ocorreu um erro ao buscar os dados do clima.
                Tente pesquisar novamente ou verifique o nome da cidade.
            </p>
        </div>
    )
}

export default WeatherErrorState