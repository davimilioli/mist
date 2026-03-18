import { TabsTrigger } from "../ui/tabs";


type Props = {
    value: string;
    label: string;
}

const ForecastTabs = ({ value, label }: Props) => {
    return (
        <TabsTrigger 
            value={value} 
            className="data-[state=active]:bg-transparent data-[state=active]:text-zinc-950 data-[state=active]:shadow-none text-zinc-400 font-sans font-bold p-4 transition-all hover:cursor-pointer rounded-xl"
            >
            {label}
        </TabsTrigger>
    )
}

export default ForecastTabs;