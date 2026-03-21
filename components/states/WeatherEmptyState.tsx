import { CloudSun } from "lucide-react";

const WeatherEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6 animate-in fade-in duration-500">
      <div className="bg-zinc-100/50 dark:bg-zinc-800/50 p-8 rounded-full">
        <CloudSun className="w-24 h-24 text-zinc-400" strokeWidth={1.5} />
      </div>
      <div className="space-y-3 max-w-md mx-auto">
        <h2 className="text-3xl font-bold text-zinc-700 dark:text-zinc-200">Bem-vindo(a) ao seu Clima</h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed">
          Busque por uma cidade na barra superior para visualizar a temperatura atual, informações detalhadas e a previsão para os próximos dias.
        </p>
      </div>
    </div>
  );
};

export default WeatherEmptyState;
