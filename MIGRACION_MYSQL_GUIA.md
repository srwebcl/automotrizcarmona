# Guía Técnica Definitiva: Migración de PostgreSQL a MySQL Local (Cloudways)

Este documento contiene el plan maestro detallado para trasladar la base de datos de Neon Serverless (PostgreSQL) hacia el servidor nativo de Cloudways (MySQL). El objetivo final de esta migración es lograr latencias de **0.1 milisegundos** en el panel de administración de Filament.

## Fase 1: Limpieza Estructural de Migraciones (Código Local)
Antes de tocar cualquier servidor, es **obligatorio** eliminar el código SQL específico de PostgreSQL que existe actualmente en el proyecto. MySQL no reconoce comandos como `BIGSERIAL` o `JSONB`.

Se deben refactorizar estos 6 archivos en `database/migrations/`:

1. **`2026_05_06_000001_create_marketing_scripts_table.php`**
   - **Problema:** Usa `DB::statement("CREATE TABLE...")` con `BIGSERIAL`.
   - **Solución:** Reescribir usando el Schema Builder: `$table->id(); $table->string('name');`, etc.
2. **`2026_04_12_130000_remove_excerpt_from_legal_documents.php`**
   - **Problema:** Usa `DB::statement("ALTER TABLE... DROP COLUMN")`.
   - **Solución:** Usar `Schema::table('legal_documents', function ($table) { $table->dropColumn('excerpt'); });`
3. **`2026_04_12_002100_make_features_fields_nullable.php`**
   - **Problema:** `DB::statement('ALTER TABLE features ALTER COLUMN title DROP NOT NULL')`.
   - **Solución:** Usar `$table->string('title')->nullable()->change();`
4. **`2026_04_10_200000_add_location_and_data_to_banners.php`**
   - **Problema:** Usa `JSONB`.
   - **Solución:** Usar `$table->json('custom_data')->nullable();`
5. **`2026_04_07_204143_add_banners_to_truck_brands_table.php`**
   - **Problema:** Sentencias `ALTER TABLE` puras.
   - **Solución:** Usar `Schema::table` nativo.
6. **`2026_04_20_000003_add_discover_more_images_to_brands_table.php`**
   - **Problema:** Sentencias `ALTER TABLE` puras.
   - **Solución:** Usar `Schema::table` nativo.

> Una vez refactorizadas estas 6 migraciones, se debe hacer `git commit` y desplegar los cambios al servidor de producción en Cloudways.

---

## Fase 2: Preparación del Entorno MySQL en Cloudways
Una vez que el código en el servidor sea compatible con MySQL, preparamos el terreno:

1. En la consola SSH del servidor, pon la web en modo mantenimiento:
   ```bash
   php artisan down --secret="migracion-mysql"
   ```
2. Abre el archivo `.env` del servidor y reemplaza los datos de Neon por las credenciales de MySQL de Cloudways:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=hgtvzqgmuk
   DB_USERNAME=hgtvzqgmuk
   DB_PASSWORD=d3FfNGcwSH
   ```
3. Ejecuta el comando para construir las tablas vacías:
   ```bash
   php artisan migrate:fresh
   ```
   *(Si la Fase 1 se hizo correctamente, esto creará las tablas en un instante sin errores).*

---

## Fase 3: Puente de Datos (Extracción e Inyección)
Como los dialectos de base de datos son distintos, usaremos **DBeaver** (instalado en tu Mac) para hacer de puente inteligente.

1. **Conectar Neon (Origen):** Abre DBeaver y crea una nueva conexión a PostgreSQL usando tu URL de Neon actual.
2. **Conectar Cloudways (Destino):** 
   - Crea una conexión MySQL en DBeaver.
   - En la pestaña "SSH" de DBeaver, ingresa los datos de acceso remoto de tu servidor Cloudways (IP, Usuario master, Contraseña). Esto creará un "Túnel SSH" para conectarse de forma segura a MySQL.
3. **El Traspaso:**
   - En DBeaver, despliega la conexión de Neon, selecciona todas tus tablas (public -> tables).
   - Haz clic derecho -> **Export Data**.
   - Selecciona **Database** como destino y elige la conexión de Cloudways (MySQL).
   - DBeaver mapeará automáticamente las columnas y transferirá los miles de registros de forma limpia.

---

## Fase 4: Puesta en Marcha (El Regreso)
Una vez finalizada la transferencia en DBeaver:

1. Vuelve a la consola SSH del servidor Cloudways.
2. Limpia el caché para que Laravel reconozca definitivamente el nuevo cerebro:
   ```bash
   php artisan optimize:clear
   php artisan optimize
   php artisan filament:optimize
   ```
3. Abre las puertas al público:
   ```bash
   php artisan up
   ```

A partir de este segundo, tu panel de Filament estará corriendo con MySQL en la misma placa base que el servidor web, entregando tiempos de respuesta de milisegundos y cargas de pantalla inmediatas.
