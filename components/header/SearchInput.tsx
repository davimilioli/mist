"use client"

import { useState } from "react";
import { useHistory } from "@/app/stores/history";
import { weatherService } from "@/services/weather";
import { useDebouncedCallback } from "use-debounce";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList, CommandGroup } from "../ui/command";
import { CitySuggestions } from "@/types/GeoApi";
import { useRouter } from "next/navigation";
import { createSlug } from "@/lib/utils";

type SearchStatus = 'idle' | 'searching' | 'success' | 'error' | 'empty';

const SearchInput = () => {
    const router = useRouter();
    const { addCityHistory } = useHistory();
    const [cityField, setCityField] = useState<string>('');
    const [suggestionsCity, setSuggestionsCity] = useState<CitySuggestions[]>([]);
    const [status, setStatus] = useState<SearchStatus>('idle');

    const handleSearch = (city: string) => {
        if (!city || city.trim() === '') return;

        const slug = createSlug(city);
        router.push(`/?city=${slug}`);

        const formattedCity = city.trim();
        addCityHistory(formattedCity);

        setSuggestionsCity([]);
        setStatus("idle");
        setCityField("")
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

            console.log(cities)

            if (!cities || cities.length === 0) {
                console.log('parou qui')
                setSuggestionsCity([]);
                setStatus('empty');
            } else {

                setSuggestionsCity(cities);
                setStatus('success');
            }
        } catch (err) {
            setSuggestionsCity([]);
            setStatus('error');
            console.error("Erro ao buscar cidades:", err);
        }
    }, 500);

    const handleCommandChange = (value: string) => {
        setCityField(value);
        debouncedSearch(value);
    };

    return (
        <div className="relative w-full max-w-xl">
            <Command shouldFilter={false}
                className="relative bg-transparent border-0 shadow-none !p-0 !pb-0 overflow-visible w-ful">
                <div className="!p-0 h-full w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                    <CommandInput
                        placeholder="Digite o nome da cidade..."
                        onValueChange={handleCommandChange}
                        value={cityField}
                        className="!py-0 h-full w-full !bg-transparent border-0 focus:ring-0 focus:border-0"
                    />
                </div>
                {status !== 'idle' && cityField.length >= 3 &&
                    <CommandList className="absolute top-full left-0 w-full z-50 mt-2 bg-white dark:bg-zinc-950 border rounded-xl shadow-xl p-2">
                        {status === 'searching' &&
                            <div className="py-6 text-center text-sm text-zinc-500">
                                Buscando cidades...
                            </div>
                        }
                        {status === 'error' && <CommandEmpty>Erro ao buscar cidades.</CommandEmpty>}
                        {status === 'empty' && <CommandEmpty>Nenhuma cidade encontrada.</CommandEmpty>}
                        {status === 'success' && suggestionsCity.length > 0 ?
                            <CommandGroup>
                                {suggestionsCity.map((city, index) => (
                                    <CommandItem key={index} onSelect={() => {
                                        setCityField(city.cityName);
                                        handleSearch(city.cityName);
                                        setSuggestionsCity([]);
                                        setStatus('idle');
                                    }}
                                        className="cursor-pointer"
                                    >
                                        {`${city.cityName}${city.state ? `, ${city.state}` : ''} ${city.country ? `- ${city.country}` : ''}`}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                            : null}
                    </CommandList>
                }
            </Command>
        </div>
    )
}

export default SearchInput;