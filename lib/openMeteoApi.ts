import axios from "axios";

export const openMeteoServerApi = axios.create({
    baseURL: 'https://api.open-meteo.com/v1'
})