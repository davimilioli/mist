import { geoApi } from "@/lib/geoApi";
import { openMeteoServerApi } from "@/lib/openMeteoApi";
import { City } from "@/types/City";
import { GeoApi } from "@/types/GeoApi";

export const weatherService = {
    async getCityCoordinates(city: string): Promise<GeoApi | null> {
        const response = await geoApi.get(`/search`, {
            params: {
                name: city,
                count: 1,
                language: "pt",
                format: "json"
            },
        });

        if (!response.data.results || response.data.results.length === 0) {
            return null;
        }

        const cityData: GeoApi = {
            name: response.data.results[0].name,
            latitude: response.data.results[0].latitude,
            longitude: response.data.results[0].longitude,
            admin1: response.data.results[0].admin1,
            country: response.data.results[0].country,
            country_code: response.data.results[0].country_code,
        };

        return cityData;
    },

    async getWeatherData(city: string): Promise<City | null> {
        const cityData = await this.getCityCoordinates(city);

        if (!cityData) return null;

        console.log(cityData)

        const { latitude, longitude, name } = cityData;

        const response = await openMeteoServerApi.get('/forecast', {
            params: {
                latitude,
                longitude,
                current: 'temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code',
                daily: 'temperature_2m_max,temperature_2m_min,weather_code',
                timezone: 'auto',
                hourly: 'temperature_2m,weather_code',
                forecast_days: 7
            }
        });

        return {
            location: name,
            ...response.data
        }
    }
}