# Contrato de API y CRM (Laravel 12 <-> Next.js 15 <-> Tecnom CRM)

## 1. Interfaz de Envío de Leads (Next.js a Laravel)
Endpoint: `POST /api/v1/leads`

El frontend enviará este JSON al backend en Laravel.

```json
{
  "source": "ventas", // Valores: ventas, dyp, servicio_tecnico, repuestos, reclamos
  "customer": {
    "rut": "12345678-9",
    "first_name": "Juan",
    "last_name": "Pérez",
    "email": "juan@example.com",
    "phone": "+56912345678"
  },
  "vehicle": {
    "brand_name": "Toyota",
    "model_name": "Yaris Cross",
    "version_name": "1.5 CVT",
    "year": "2024",
    "vin": null
  },
  "request_details": {
    "service_type": "Mantención Preventiva",
    "message": "Necesito cotizar este modelo a crédito."
  }
}

2. Transformación a ADF XML (El Servicio en Laravel)
El backend de Laravel actuará como un "traductor". Debe tener un servicio llamado TecnomCrmService.php con un método sendLeadToTecnom($leadData).

Reglas estrictas para el código en Laravel (TecnomCrmService.php):

Construcción del XML: El servicio debe tomar el Array/Objeto del Lead y construir un String XML válido. No uses librerías complejas, puedes usar concatenación de strings o view() de Blade para renderizar el XML.

La estructura EXACTA del string debe ser esta:

XML
<?xml version="1.0" encoding="UTF-8"?>
<?adf version="1.0"?>
<adf>
    <prospect>
        <requestdate>{{ Fecha actual ISO 8601 }}</requestdate>
        <vehicle interest="buy" status="new">
            <year>{{ Año del auto }}</year>
            <make>{{ Marca del auto }}</make>
            <model>{{ Modelo del auto }}</model>
            <trim>{{ Versión del auto }}</trim>
        </vehicle>
        <customer>
            <contact>
                <name part="first">{{ Nombre }}</name>
                <name part="last">{{ Apellido }}</name>
                <email>{{ Correo electrónico }}</email>
                <phone type="cell">{{ Teléfono }}</phone>
            </contact>
            <comments>Origen: {{ source }} | Mensaje: {{ Mensaje del cliente }}</comments>
        </customer>
        <vendor>
            <vendorname>Automotriz Carmona</vendorname>
        </vendor>
        <provider>
            <name>Sitio Web Automotriz Carmona</name>
        </provider>
    </prospect>
</adf>
Envío HTTP: Una vez construido el string XML, el servicio debe enviarlo a Tecnom usando la fachada Http de Laravel.

El código debe verse similar a esto:

PHP
use Illuminate\Support\Facades\Http;

$response = Http::withBasicAuth(env('TECNOM_USER'), env('TECNOM_PASS'))
    ->withHeaders([
        'Content-Type' => 'application/x-www-form-urlencoded'
    ])
    ->post('[https://automotrizcarmona.tecnomcrm.com/api/v1/webconnector/consultas/adf](https://automotrizcarmona.tecnomcrm.com/api/v1/webconnector/consultas/adf)', [
        'data' => $xmlString // Enviar el XML crudo en el body o payload form-urlencoded según requiera ADF.
    ]);
(Nota para la IA: Configura la petición HTTP enviando el XML crudo en el cuerpo de la petición si el endpoint de Tecnom exige raw XML).

3. Interfaces de Catálogo (Laravel a Next.js)
GET /api/v1/brands
Devuelve: Lista de marcas con id, slug, name, logo_url, brand_color_css.

GET /api/v1/models/{brand_slug}
Devuelve: Lista de modelos básicos (sin versiones) para las tarjetas del catálogo.

GET /api/v1/models/{brand_slug}/{model_slug}
Devuelve: Modelo detallado, incluyendo relaciones: gallery (array), features (array), y versions (array con precios).