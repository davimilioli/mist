"use client"

import { useWeather } from "@/app/stores/weather";
import { useState } from "react";
import { useHistory } from "@/app/stores/history";
import { weatherService } from "@/services/weather";
import { useDebouncedCallback } from "use-debounce";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList, CommandGroup } from "../ui/command";
import { CitySuggestions } from "@/types/GeoApi";
import LoadingSpinner from "../LoadingSpinner";

type SearchStatus = 'idle' | 'searching' | 'success' | 'error' | 'empty';

const SearchInput = () => {
    const { setCity, setLoading, setError } = useWeather();
    const { addCityHistory } = useHistory();
    const [cityField, setCityField] = useState<string>('');
    const [suggestionsCity, setSuggestionsCity] = useState<CitySuggestions[] | null>([]);
    const [status, setStatus] = useState<SearchStatus>('idle');

    const handleSearch = async (city: string) => {
        console.log(city)
        if (!city || city.trim() === '') {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const cityReq = await weatherService.getWeatherData(city);

            if (!cityReq) {
                setError("Cidade não encontrada");
                return;
            }

            setCity(cityReq);
            addCityHistory(cityReq.city);
            setLoading(false);
        } catch (error) {
            console.log('Erro ao buscar dados de clima', error);
            setError("Ocorreu algum erro ao pesquisar a cidade");
            setLoading(false);
        }
    }

    const debouncedSearch = useDebouncedCallback(async (city: string) => {
        if (city.length < 3) {
            setSuggestionsCity([]);
            setStatus('idle');
            return;
        }

        setStatus('searching');

        try {
            const cities = await weatherService.getCitySuggestions(city);

            if (!cities || cities.length === 0) {
                setSuggestionsCity([]);
                setStatus('empty');
            } else {
                setSuggestionsCity(cities);
                setStatus('success');
            }
        } catch (err) {
            setStatus('error');
        }
    }, 500);

    const handleCommandChange = (value: string) => {
        setCityField(value);
        debouncedSearch(value);
    };

    return (
        <div className="w-full max-w-xl">
            <Command shouldFilter={false} className="relative overflow-visible border rounded-xl shadow-md">
                <div className="relative">
                    <CommandInput
                        placeholder="Digite o nome da cidade..."
                        onValueChange={handleCommandChange}
                        className="pr-10"
                    />

                    {status === 'searching' && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                            <LoadingSpinner size={6} />
                        </div>
                    )}
                </div>
                {cityField.length >= 3 &&
                    <CommandList className="absolute top-full left-0 w-full z-50 mt-2 bg-white dark:bg-zinc-950 border rounded-xl shadow-xl">
                        {status === 'error' && <CommandEmpty>Erro ao buscar cidades.</CommandEmpty>}
                        {status === 'empty' && <CommandEmpty>Nenhuma cidade encontrada.</CommandEmpty>}
                        {status === 'success' && suggestionsCity && suggestionsCity.length > 0 &&
                            <CommandGroup heading="Cidades">
                                {suggestionsCity.map((city, index) => (
                                    <CommandItem key={index} onSelect={() => {
                                        setCityField(city.cityName);
                                        handleSearch(city.cityName);
                                        setSuggestionsCity([]);
                                    }}
                                        className="cursor-pointer"
                                    >
                                        {`${city.cityName}${city.state ? `, ${city.state}` : ''} - ${city.country}`}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        }
                    </CommandList>
                }
            </Command>
        </div>
    )
}

export default SearchInput;