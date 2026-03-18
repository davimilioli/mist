import { openMeteoServerApi } from "@/lib/openMeteoApi";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');

    if(!city) return NextResponse.json({ error: "O nome da cidade é obrigatório" }, { status: 400 });

    try {
        const { origin } = new URL(request.url);

        const geoApiResponse = await openMeteoServerApi.get(`${origin}/api/geoapi`, {
            params: { city: city },
            timeout: 4000
        })

        const { latitude, longitude, name } = geoApiResponse.data;

       const openMeteoApiResponse = await openMeteoServerApi.get('/forecast', {
            params: {
                latitude,
                longitude,
                current: 'temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code',
                daily: 'temperature_2m_max,temperature_2m_min',
                timezone: 'auto'
            }
        });

        return NextResponse.json({
            location: name,
            ...openMeteoApiResponse.data
        });
        
    } catch(error: any) {
        console.error("Erro na API Open Meteo:", error.response?.data || error.message);
        return NextResponse.json(
            { error: error.response?.data?.message || 'Erro ao buscar clima' }, 
            { status: error.response?.status || 500 }
        );
    }
}