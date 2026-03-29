"use client"

import { MapPin, ChevronDown, TrashIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useHistory } from "@/app/stores/history"
import { useRouter, useSearchParams } from "next/navigation";
import { createSlug, unslugify } from "@/lib/utils";

const CityDropdown = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { recentCities, clearHistory } = useHistory();

    const citySlug = searchParams.get("city");

    const handleSelectCity = (city: string) => {
        const formattedCity = city.trim();
        router.push(`/?city=${createSlug(formattedCity)}`);
    }

    const labelCity = citySlug ? recentCities.find(c => createSlug(c) === citySlug) || unslugify(citySlug) : recentCities[0] || "Buscas recentes";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 group rounded-xl cursor-pointer p-2">
                    <MapPin className="w-4 h-4 text-zinc-500 dark:text-zinc-200" />
                    <span className="text-sm tracking-tight hidden md:block">{labelCity}</span>
                    <ChevronDown className="w-3 h-3 text-zinc-400 group-data-[state=open]:rotate-180 transition-transform hidden md:block" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 bg-white dark:bg-zinc-900 rounded-xl">
                <DropdownMenuLabel className="text-xs text-zinc-400 uppercase font-bold">Histórico</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {recentCities.length > 0 &&
                    <>
                        {recentCities.map((city, index) => (
                            <DropdownMenuItem
                                key={index}
                                className="cursor-pointer"
                                onClick={() => handleSelectCity(city)}
                            >
                                {city}
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem variant="destructive" className="cursor-pointer" onClick={clearHistory}>
                                <TrashIcon />
                                Limpar histórico
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </>
                }
                {recentCities.length == 0 &&
                    <div className="px-2 py-4 text-center text-xs text-zinc-500 italic">
                        Sem Histórico
                    </div>
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default CityDropdown;