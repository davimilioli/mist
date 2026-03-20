import { NextResponse } from "next/server";
import { weatherService } from "@/services/weather";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');

    if (!city) return NextResponse.json({ error: "O nome da cidade é obrigatório" }, { status: 400 });

    try {
        const cityData = await weatherService.getCityCoordinates(city);

        if (!cityData) {
            return NextResponse.json({ error: "Cidade não encontrada" }, { status: 404 });
        }

        return NextResponse.json(cityData);
    } catch (error: any) {
        console.error("Erro na API Geo:", error);
        return NextResponse.json(
            { error: error.response?.data?.message || 'Erro ao buscar cidade' },
            { status: error.response?.status || 500 }
        );
    }
}