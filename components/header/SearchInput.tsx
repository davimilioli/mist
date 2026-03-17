import { Input } from "@/components/ui/input"
import { Search } from "lucide-react";

const SearchInput = () => {
    return (
        <div className="relative w-full max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 z-10" />
            <Input 
                placeholder="Digite o nome da cidade..." 
                className="w-full bg-white  pl-10 h-10 rounded-xl text-dark dark:text-white placeholder:text-zinc-400 focus-visible:ring-1 focus-visible:ring-zinc-200"
            />
        </div>
    )
}

export default SearchInput;