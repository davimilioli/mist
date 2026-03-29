"use client"

import { useTransition } from "react";
import { refreshWeatherData } from "@/app/actions/weather";
import { RefreshCw } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
    city: string;
}

export default function RefreshButton({ city }: Props) {
    const [isPending, startTransition] = useTransition();

    const handleRefresh = () => {
        startTransition(async () => {
            await refreshWeatherData(city);
        });
    };

    return (
        <Button
            onClick={handleRefresh}
            disabled={isPending}
            className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl cursor-pointer"
        >
            <RefreshCw className={`w-4 h-4 text-zinc-500 dark:text-zinc-200
                ${isPending ? "animate-spin" : ""}`}
            />
            <span className="hidden md:block text-sm tracking-tight text-zinc-500 dark:text-zinc-200">{isPending ? "Atualizando..." : "Atualizar"}</span>
        </Button>
    )
}