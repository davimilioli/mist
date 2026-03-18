import axios from "axios";

export const geoApi = axios.create({
    baseURL: 'https://geocoding-api.open-meteo.com/v1'
})