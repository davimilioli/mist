export type ForecastItem = {
    hour: string;
    temperature: number;
    condition: string;
};

export type NextSevenDays = {
    day: string;
    temperatureMax: number;
    temperatureMin: number;
    condition: string;
};

export type TemperatureCurrent = {
    temperature: number;
    temperatureMax: number;
    temperatureMin: number;
    humidity: number;
    condition: string;
    windSpeed: number;
};

export interface WeatherData {
    city: string;
    latitude: number;
    longitude: number;
    time: string;
    temperatureCurrent: TemperatureCurrent;
    hourlyForecast: {
        today: ForecastItem[];
        tomorrow: ForecastItem[];
        nextSevenDays: any[];
    };
}