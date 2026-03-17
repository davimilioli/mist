import { MapPin, ChevronDown} from "lucide-react"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,  DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const CityDropdown = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center ps-0gap-2 hover:bg-white hover:dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 group rounded-xl">
                    <MapPin className="w-4 h-4 text-zinc-400" />
                    <span className="text-sm font-semibold tracking-tight">Rio de Janeiro, BR</span>
                    <ChevronDown className="w-3 h-3 text-zinc-400 group-data-[state=open]:rotate-180 transition-transform" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 bg-white dark:bg-zinc-900 rounded-xl">
                <DropdownMenuLabel className="text-xs text-zinc-400 uppercase tracking-widest font-bold">Cidades</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">São Paulo, BR</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Nova York, US</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default CityDropdown;