import { LoaderCircle } from "lucide-react";
import { Spinner } from "../ui/spinner"


type Props = {
    message?: string
    size: number;
}

const WeatherLoadingState = ({ size, message }: Props) => {
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl-[28px] transition-all duration-300 rounded-xl p-2">
                <Spinner className={`size-${size}`}>
                    <LoaderCircle />
                </Spinner>
            </div>
            {message && <p className="text-zinc-500 dark:text-zinc-400">{message}</p>}
        </div>

    )
}

export default WeatherLoadingState;