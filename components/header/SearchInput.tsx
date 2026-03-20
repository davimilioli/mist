"use client"

import { useWeather } from "@/app/stores/weather";
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { useHistory } from "@/app/stores/history";
import { weatherService } from "@/services/weather";

const SearchInput = () => {
    const { setCity, setLoading, setError, isLoading } = useWeather();
    const { addCityHistory } = useHistory();
    const [cityField, setCityField] = useState<string>('');

    const handleSearch = async () => {

        if (cityField.trim() === '') {
            setLoading(false);
        }

        setLoading(true);
        setError(null);

        try {
            const cityReq = await weatherService.getWeatherData(cityField.toLocaleLowerCase());

            if (!cityReq) {
                setError("Cidade não encontrada");
                return;
            }

            setCity(cityReq);
            addCityHistory(cityReq.location);
            setLoading(false);
        } catch (error) {
            console.log('Erro ao buscar dados de clima', error);
            setError("Ocorreu algum erro ao pesquisar a cidade");
            setLoading(false);
        }
    }

    return (
        <div className="w-full max-w-xl flex items-center gap-2">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 z-10" />
                <Input
                    placeholder="Digite o nome da cidade..."
                    className="w-full bg-white  pl-10 h-10 rounded-xl text-dark dark:text-white placeholder:text-zinc-400 focus-visible:ring-1 focus-visible:ring-zinc-200"
                    value={cityField}
                    onChange={e => setCityField(e.target.value)}
                    disabled={isLoading}
                />
            </div>
            <Button onClick={handleSearch} disabled={isLoading} className="rounded-xl">Buscar</Button>
        </div>
    )
}

export default SearchInput;