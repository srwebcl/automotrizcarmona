/**
 * Normaliza un RUT chileno al formato "cuerpo-DV" que espera Salesforce
 * (ej: "13360037-k"), sin importar cómo lo haya escrito el cliente en el
 * formulario (con puntos, con o sin guión, con espacios, etc.).
 *
 * Además valida el dígito verificador con el algoritmo estándar (módulo 11).
 * Si no calza, IGUAL se envía el RUT normalizado (mejor esfuerzo: preferimos
 * no bloquear la cotización por esto), pero se deja un warning explícito en
 * el log para poder distinguir "el cliente escribió mal su RUT" de "hay un
 * bug en la integración" — que es justamente lo que costó diagnosticar en
 * el incidente del 2026-08-17.
 */
function normalizeRut(rawRut: string): string {
    if (!rawRut) return '';

    // 1. Dejar solo dígitos y k/K (saca puntos, guiones, espacios, etc.)
    const clean = rawRut.replace(/[^0-9kK]/g, '');
    if (clean.length < 2) return clean; // Muy corto para tener cuerpo + DV; se envía tal cual

    // 2. Separar cuerpo y dígito verificador (siempre es el último caracter)
    const body = clean.slice(0, -1);
    const dv = clean.slice(-1).toLowerCase();

    // 3. Validar el DV (módulo 11) solo para poder loguear si no calza
    let sum = 0;
    let multiplier = 2;
    for (let i = body.length - 1; i >= 0; i--) {
        sum += parseInt(body[i], 10) * multiplier;
        multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }
    const remainder = 11 - (sum % 11);
    const expectedDv = remainder === 11 ? '0' : remainder === 10 ? 'k' : String(remainder);

    if (expectedDv !== dv) {
        console.warn(`RUT con dígito verificador inválido recibido del formulario: "${rawRut}" (se esperaba DV "${expectedDv}", vino "${dv}"). Se envía igual a Salesforce en formato normalizado "${body}-${dv}".`);
    }

    // 4. Reinsertar el guión en la posición correcta, sin importar el input original
    return `${body}-${dv}`;
}

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

        // Normaliza el RUT al formato "cuerpo-DV" (ej: 11111111-8) sin importar
        // cómo lo haya escrito el cliente en el formulario.
        const rut = normalizeRut(payload.customer?.rut || '');

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
                    typeMaterial: "vehicle"
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
