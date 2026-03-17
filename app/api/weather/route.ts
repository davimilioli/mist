import { weatherServerApi } from "@/lib/weatherApi";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');

    if(!city) return NextResponse.json({ error: "Cidade não informada" }, { status: 400 });

    try {
        const response = await weatherServerApi.get('/weather', {
            params: { q: city }
        });
        
        return NextResponse.json(response.data);
    } catch(error: any) {
        console.error("Erro na API:", error.response?.data || error.message);
        return NextResponse.json(
            { error: error.response?.data?.message || 'Erro ao buscar clima' }, 
            { status: error.response?.status || 500 }
        );
    }
}