export async function sendQuoteToSalesforce(payload: any) {
    const clientId = process.env.SALESFORCE_MULESOFT_CLIENT_ID;
    const clientSecret = process.env.SALESFORCE_MULESOFT_CLIENT_SECRET;
    const tokenUrl = process.env.SALESFORCE_MULESOFT_TOKEN_URL;
    const quoteUrl = process.env.SALESFORCE_MULESOFT_QUOTE_URL; // e.g. https://dealer-exp-api-qas-eh5zuw.na8zri.usa-e1.cloudhub.io/api/dealers/100014/quote

    if (!clientId || !clientSecret || !tokenUrl || !quoteUrl) {
        console.error("Faltan credenciales de Mulesoft en las variables de entorno.");
        return { success: false, error: 'Credenciales incompletas' };
    }

    try {
        // 1. Obtener Token
        const tokenResponse = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'client_id': clientId,
                'client_secret': clientSecret,
                'grant_type': 'CLIENT_CREDENTIALS',
                'scope': 'WEB_DEALER'
            }
        });

        if (!tokenResponse.ok) {
            const err = await tokenResponse.text();
            console.error("Error obteniendo token de Mulesoft:", err);
            return { success: false, error: 'Token Mulesoft fallido' };
        }

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token; // Ajustar según cómo venga en la respuesta real

        // 2. Construir el payload para Salesforce
        // Convertimos el celular a formato internacional si es necesario
        let phone = payload.customer?.phone || '';
        if (phone.startsWith('+56 9 ') || phone.startsWith('+569')) {
            phone = phone.replace(/\s+/g, ''); // Deja +569...
        }

        let rut = payload.customer?.rut || '';
        // Salesforce suele requerir RUT sin puntos (ej: 11111111-8)
        rut = rut.replace(/\./g, '');

        const quotePayload = {
            client: {
                fullName: `${payload.customer?.first_name || ''} ${payload.customer?.last_name || ''}`.trim(),
                email: payload.customer?.email || '',
                rut: rut,
                phone: phone,
                originAccount: "Web concesionario"
            },
            opportunity: {
                source: "Web concesionario"
            },
            quote: {
                name: "Cotizacion WEB CARMONA",
                paymentType: "Otros Creditos", // Valor default o podríamos leerlo si hubiera la opción
                description: "Cotizacion generada en sitio web Automotriz Carmona"
            },
            products: [
                {
                    version: payload.vehicle?.sap_material_code || "UNKNOWN",
                    price: Math.floor(Number(payload.vehicle?.price || 20000000)), 
                    typeMaterial: "Vehicle" // Capitalizado por si Salesforce lo requiere así
                }
            ]
        };

        console.log("DEBUG MULESOFT PAYLOAD ENVIADO:", JSON.stringify(quotePayload, null, 2));

        // 3. Enviar Cotización
        const quoteResponse = await fetch(quoteUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'client_id': clientId,
                'client_secret': clientSecret,
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(quotePayload)
        });

        if (!quoteResponse.ok) {
            const quoteErr = await quoteResponse.text();
            console.error("Error enviando Quote a Mulesoft:", quoteResponse.status, quoteErr);
            return { success: false, error: `Error Mulesoft Quote: ${quoteResponse.status}` };
        }

        const result = await quoteResponse.json();
        console.log("Salesforce Quote Response:", result);
        return { success: true, result };

    } catch (error: any) {
        console.error("Error general de integración con Mulesoft:", error);
        return { success: false, error: error.message };
    }
}
