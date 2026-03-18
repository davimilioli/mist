"use client"

import { useWeather } from "@/app/stores/weather";
import { Input } from "@/components/ui/input"
import { api } from "@/lib/api";
import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { useHistory } from "@/app/stores/history";

const SearchInput = () => {
    const { setCity, setLoading, setError, isLoading } = useWeather();
    const { addCityHistory } = useHistory();
    const [cityField, setCityField] = useState<string>('');

    const handleSearch = async () => {
        setLoading(true);

        if(cityField.trim() === '') {
            setLoading(false);
        }
    
        try {
            const cityReq = await api.get(`/openmeteo?city=${cityField.toLocaleLowerCase()}`);

            if(!cityReq.data) {
                alert(cityReq.data.error)
            } else {
                setCity(cityReq.data);
                addCityHistory(cityReq.data.location)
            } 

            setLoading(false);
            setError(null);
        } catch(error) {
            console.log('Ocorreu algum erro ao pesquisar uma mensagem');
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