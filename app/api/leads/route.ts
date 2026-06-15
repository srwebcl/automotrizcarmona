import { NextResponse } from 'next/server';
import { API_URL } from '@/lib/api';
import { sendQuoteToSalesforce } from '@/lib/salesforce';

/**
 * Next.js API Route para actuar como Backend For Frontend (BFF).
 * Recibe el formulario del navegador web y lo redirige internamente a tu
 * API de Laravel en la nube. Laravel guarda el Lead en la base de datos y 
 * luego usa un Job en segundo plano para avisarle a Tecnom.
 */

export async function POST(request: Request) {
    try {
        const payload = await request.json();
        
        console.log("DEBUG PAYLOAD VEHICLE:", JSON.stringify(payload.vehicle));

        // INTEGRACION TOYOTA SALESFORCE (OPCION A)
        if (payload.vehicle?.brand_name?.toLowerCase() === 'toyota' && payload.vehicle?.sap_material_code) {
            console.log("Detectado Toyota con SAP Material Code. Enviando a Salesforce...");
            try {
                await sendQuoteToSalesforce(payload);
            } catch (e) {
                console.error("Error en sendQuoteToSalesforce:", e);
            }
        }


        const response = await fetch(`${API_URL}/leads`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            return NextResponse.json({ 
                success: true, 
                message: data.message || 'Lead enviado con éxito a Laravel' 
            });
        } 
        
        console.error(`Error Laravel API (${response.status}):`, data);
        return NextResponse.json({ 
            success: false, 
            error: data.message || `Error en la respuesta del Backend (${response.status})`,
            details: data
        }, { status: response.status });

    } catch (error: any) {
        console.error('Next.js API Error conectando a Laravel:', error);
        return NextResponse.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
}
