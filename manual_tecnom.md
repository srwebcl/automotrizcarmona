¿Cómo integrar leads digitales con Tecnom Nubux a través de la API Rest?

Actualizado hace más de 3 meses

Este documento describe detalles técnicos para la integración de leads mediante API REST y requiere conocimientos técnicos de programación para su correcta implementación.

Descripción general

Tecnom Nubux permite el ingreso de leads digitales a través de su API de integración de leads.
El formato de los datos enviados se basa en el estándar Auto-lead Data Format (ADF).

👉 Para conocer más sobre los fundamentos y conceptos de API REST, consulte la documentación disponible en el siguiente enlace: Documentación General API REST

Seguridad y autenticación

El acceso a la API se realiza exclusivamente mediante HTTPS.
Toda la información enviada y recibida se transmite en formato JSON.
La autenticación se realiza mediante HTTP Basic Authentication.
Para obtener un usuario y contraseña con permisos de acceso a la API, debe contactarse con el equipo de soporte: 📧 soporte@tecnom.com.ar

Endpoint y URL de la API

Ruta relativa
POST /api/v1/webconnector/consultas/adf

URL absoluta (Producción)
https://concesionarioID.tecnomcrm.com/api/v1/webconnector/consultas/adf

URL absoluta (Ambiente de pruebas – QA)
https://test-concesionarioID.tecnomcrm.com/api/v1/webconnector/consultas/adf

Consideraciones importantes

Cada concesionario posee un subdominio propio, identificado como concesionarioID.
La URL definitiva y el subdominio deben ser validados y acordados con el equipo de soporte antes de salir a producción.
Contacto de soporte: soporte@tecnom.com.ar

Request

El cuerpo del request debe enviarse en formato JSON, respetando la estructura definida por el estándar ADF.
La especificación completa de los campos disponibles, junto con sus validaciones, se detalla en el Anexo al final de este documento.

Ejemplo de request

{
  "prospect": {
    "requestdate": "2017-09-29T18:48:45.857161Z",
    "customer": {
      "comments": "Se puede abonar en efectivo en lugar de financiado?",
      "contacts": [
        {
          "emails": [
            {
              "value": "vane.auto@gmail.com"
            }
          ],
          "names": [
            {
              "part": "first",
              "value": "Vanesa Elizabeth"
            },
            {
              "part": "last",
              "value": "Perez"
            }
          ],
          "phones": [
            {
              "type": "cellphone",
              "value": "113626544299"
            }
          ],
          "addresses": [
            {
              "city": "Córdoba",
              "postalcode": "X5022"
            }
          ]
        }
      ]
    },
    "vehicles": [
      {
        "make": "Marca",
        "model": "Modelo",
        "trim": "Version",
        "year": 2017
      }
    ],
    "provider": {
      "name": {
        "value": "Google Adwords"
      },
      "service": "Campaña Planes Primavera"
    },
    "vendor": {
      "contacts": [],
      "vendorname": {
        "value": "vendedor@email.com.ar"
      }
    }
  }
}


Response

Respuesta exitosa

Cuando el lead se procesa correctamente, la API devuelve el identificador de la consulta creada en Tecnom Nubux.
HTTP Status Code: 201 Created

{
  "id": 388592
}


Respuesta con error de validación

Si ocurre un error durante la validación de los datos, la API responderá con un mensaje descriptivo.
HTTP Status Code: 400 Bad Request

{
  "Message": "Ha ocurrido un error al validar la consulta",
  "ModelState": {
    "dto.prospect.id": [
      "Ya existe una consulta con id: 116554387"
    ]
  }
}


Anexo – Campos del Lead (ADF)

AdfProspect

Campo

Tipo

Descripción

id

AdfId

Identificador del lead

requestdate

string (date-time)

Fecha y hora de generación del lead

vehicles

AdfVehicle[]

Información del vehículo de interés

customer

AdfCustomer (required)

Información del cliente

provider

AdfProvider (required)

Proveedor que originó la consulta

vendor

AdfVendor

Receptor solicitado del lead

AdfCustomer

Campo

Tipo

contacts

AdfContact[] (required)

comments

string

AdfContact

Campo

Tipo

Observaciones

primarycontact

boolean



names

AdfContactName[]



emails

AdfContactEmail[]

Debe existir email o teléfono

phones

AdfContactPhone[]

Debe existir email o teléfono

addresses

AdfContactAddress[]



AdfContactName

part: first, middle, suffix, last, full

type: individual, business

value: string

AdfContactEmail

value: string

AdfContactPhone

type: phone, fax, cellphone

value: string

AdfContactAddress

street

apartment

city

regioncode

postalcode

country

type (work, home, delivery)

AdfProvider

Campo

Tipo

name

AdfContactName (required)

service

string

AdfVehicle

Campo

Tipo

year

integer

make

string (required)

model

string (required)

trim

string

vin

string

transmission

string

stock

string

odometer

integer

comments

string

interest

sell, buy, trade_in, lease

status

new, used

AdfVendor

Campo

Tipo

id

AdfId

vendorname

AdfContactName

contacts

AdfContact[]

Artículos relacionados
Plataformas y proveedores de leads integrados con Tecnom Nubux

¿Ha quedado contestada tu pregunta?
😞😐😃
Descripción general
Seguridad y autenticación
Endpoint y URL de la API
Consideraciones importantes
Request
Ejemplo de request
Response
Anexo – Campos del Lead (ADF)
Tecnom
Todo lo que buscas, en un solo lugar

Funcionamos con Intercom