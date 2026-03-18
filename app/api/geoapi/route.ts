import { GeoApi } from "@/app/types/GeoApi";
import { geoApi } from "@/lib/geoApi";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');

    if(!city) return NextResponse.json({ error: "O nome da cidade é obrigatório" }, { status: 400 });

    try {
        const response = await geoApi.get(`/search`, {
            params: {
                name: city,
                count: 1,
                language: "pt",
                format: "json"
            },
        });

        if(!response.data.results) {
            return NextResponse.json({ error: "Cidade não encontrada" }, { status: 404 });
        }

        const cityData: GeoApi = {
            name:response.data.results[0].name,
            latitude: response.data.results[0].latitude,
            longitude: response.data.results[0].longitude,
            admin1: response.data.results[0].admin1,
            country: response.data.results[0].country,
            country_code: response.data.results[0].country_code,
        }

        return NextResponse.json(cityData);
    } catch(error: any) {
        console.error("Erro na API Open Meteo:", error.response?.data || error.message);
        return NextResponse.json(
            { error: error.response?.data?.message || "Erro ao buscar cidade" }, 
            { status: error.response?.status || 500 }
        );
    }
}