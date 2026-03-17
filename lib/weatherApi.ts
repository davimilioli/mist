import axios from "axios";

export const weatherServerApi = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    params: {
        appid: process.env["NEXT_WEATHER_API_KEY"],
        units: 'metric',
        lang: 'pt_br'
    }
})