import { getResource } from "@/lib/api";
import { geoApi } from "@/lib/geoApi";
import { openMeteoServerApi } from "@/lib/openMeteoApi";
import { CitySuggestions, GeoApi } from "@/types/GeoApi";
import { ForecastItem, NextSevenDays, WeatherData } from "@/types/Weather";

export const weatherService = {
    async getCityData(city: string): Promise<GeoApi | null> {
        const response = await getResource<any>('https://geocoding-api.open-meteo.com/v1/search', {
            params: {
                name: city,
                count: 1,
                language: "pt",
                format: "json"
            },
            next: {
                revalidate: 86400,
                tags: ['city-data', `city-${city.toLocaleLowerCase()}`]
            }
        });

        if (!response.results || response.results.length === 0) {
            return null;
        }

        const cityData: GeoApi = {
            name: response.results[0].name,
            latitude: response.results[0].latitude,
            longitude: response.results[0].longitude,
            admin1: response.results[0].admin1,
            country: response.results[0].country,
            country_code: response.results[0].country_code,
            feature_code: response.results[0].feature_code,
        };

        return cityData;
    },

    async getWeatherData(city: string): Promise<WeatherData | null> {
        const cityData = await this.getCityData(city);

        if (!cityData) return null;

        const { latitude, longitude, name } = cityData;

        const response = await getResource<any>('https://api.open-meteo.com/v1/forecast', {
            params: {
                latitude,
                longitude,
                current: 'temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code',
                daily: 'temperature_2m_max,temperature_2m_min,weather_code',
                timezone: 'auto',
                hourly: 'temperature_2m,weather_code',
                forecast_days: 7
            },
            next: {
                revalidate: 3600,
                tags: ['weather-data', `weather-´${city.toLocaleLowerCase()}`]
            }
        });

        return {
            city: name,
            latitude: response.latitude,
            longitude: response.longitude,
            time: response.current.time,
            temperatureCurrent: {
                temperature: response.current.temperature_2m,
                temperatureMax: response.daily.temperature_2m_max[0],
                temperatureMin: response.daily.temperature_2m_min[0],
                humidity: response.current.relative_humidity_2m,
                condition: getCondition(response.current.weather_code),
                windSpeed: response.current.wind_speed_10m,
            },
            hourlyForecast: {
                today: transformHourlyForecast(response.current.time, response.hourly, "today"),
                tomorrow: transformHourlyForecast(response.current.time, response.hourly, "tomorrow"),
                nextSevenDays: transformNextSevenDays(response.daily)
            }
        }
    },

    async getCitySuggestions(city: string): Promise<CitySuggestions[] | null> {
        if (!city || city.length < 3) {
            return null;
        }

        const response = await getResource<any>(`https://geocoding-api.open-meteo.com/v1/search`, {
            params: {
                name: city,
                count: 5,
                language: "pt",
                format: "json"
            },
        });

        if (!response.results) return null;

        const citiesOnly = response.results.filter((city: GeoApi) => city.feature_code?.startsWith("PPL"));

        const formattedCities = citiesOnly.map((city: GeoApi) => ({
            cityName: city.name,
            state: city.admin1 || '',
            country: city.country,
            latitude: city.latitude,
            longitude: city.longitude,
        }));

        return formattedCities.filter((city: CitySuggestions, index: number, listOriginal: CitySuggestions[]) =>
            index === listOriginal.findIndex((c: CitySuggestions) => c.cityName === city.cityName)
        );
    }
}

const getCondition = (code: number): string => {
    if (code === 0) return "Ensolarado";
    if (code >= 1 && code <= 3) return "Nublado";
    if (code === 45 || code === 48) return "Neblina";
    if (code >= 51 && code <= 55) return "Chuvisco";
    if ((code >= 61 && code <= 65) || (code >= 80 && code <= 82)) return "Chuva";
    if ((code >= 71 && code <= 77) || (code === 85 || code === 86)) return "Neve";
    if (code >= 95 && code <= 99) return "Tempestade"
    return "Nublado";
}

const transformHourlyForecast = (currentTime: string, hourly: { time: string[], temperature_2m: number[], weather_code: number[] }, day: 'today' | 'tomorrow'): ForecastItem[] => {
    const currentHourString = currentTime.substring(0, 13) + ":00";

    let currentIndex = hourly.time.findIndex(time => time === currentHourString);
    if (currentIndex === -1) currentIndex = 0;

    const start = day === "today" ? currentIndex : 24;
    const end = day === "today" ? 24 : 48;

    return hourly.time.slice(start, end).map((time, index) => {
        const realIndex = start + index;

        const hourString = time.substring(11, 16);

        return {
            hour: hourString,
            temperature: hourly.temperature_2m[realIndex],
            condition: getCondition(hourly.weather_code[realIndex])
        };
    });
}

const transformNextSevenDays = ((daily: { time: string[], temperature_2m_max: number[], temperature_2m_min: number[], weather_code: number[] }): NextSevenDays[] => {
    return daily.time.map((date, index) => {
        const dayDate = new Date(date + "T00:00:00");
        let dayName = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' }).format(dayDate);
        dayName = dayName.charAt(0).toUpperCase() + dayName.slice(1).replace('.', '');

        return {
            day: dayName,
            temperatureMax: daily.temperature_2m_max[index],
            temperatureMin: daily.temperature_2m_min[index],
            condition: getCondition(daily.weather_code[index])
        }
    });
})