<?php

namespace App\Console\Commands;

use App\Models\Brand;
use App\Models\VehicleModel;
use App\Models\VehicleVersion;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class ImportCatalogCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:catalog {file}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Importa el catálogo de vehículos desde un CSV en storage/app';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $file = $this->argument('file');
        $path = storage_path('app/' . $file);

        if (!file_exists($path)) {
            $this->error("El archivo no existe en la ruta: {$path}");
            return 1;
        }

        $this->info("Importando catálogo desde: {$path}...");

        $handle = fopen($path, 'r');
        
        // Detectar delimitador leyendo la primera línea
        $firstLine = fgets($handle);
        $delimiter = strpos($firstLine, ';') !== false ? ';' : ',';
        rewind($handle);

        // Ignorar encabezados
        fgetcsv($handle, 1000, $delimiter);

        $rowCount = 0;
        while (($data = fgetcsv($handle, 1000, $delimiter)) !== false) {
            // Verificar si la fila tiene al menos 5 columnas
            if (count($data) < 5) continue;

            $brandName = trim($data[0]);
            $modelName = trim($data[1]);
            $versionName = trim($data[2]);
            $listPriceRaw = trim($data[3]);
            $bonusPriceRaw = trim($data[4]);

            if (empty($brandName) || empty($modelName) || empty($versionName)) {
                continue;
            }

            // Limpieza de precios
            $listPrice = $this->cleanPrice($listPriceRaw);
            $bonusPrice = $this->cleanPrice($bonusPriceRaw);

            // 1. Marca (Brand) - Ignorando mayúsculas/minúsculas en el lookup por Slug
            $brandSlug = Str::slug($brandName);
            $brand = Brand::firstOrCreate(
                ['slug' => $brandSlug],
                [
                    'name' => mb_convert_case($brandName, MB_CASE_TITLE, "UTF-8"),
                    'is_active' => true,
                    // Si la marca es nueva, establecemos defaults para que no de error
                    'category' => 'autos',
                    'show_in_services' => true,
                    'show_in_parts' => true,
                    'show_in_dyp' => true,
                ]
            );

            // 2. Modelo (VehicleModel)
            $modelSlug = Str::slug($modelName);
            $vehicleModel = VehicleModel::firstOrCreate(
                [
                    'brand_id' => $brand->id,
                    'slug' => $modelSlug,
                ],
                [
                    'name' => mb_convert_case($modelName, MB_CASE_TITLE, "UTF-8"),
                    'is_active' => true,
                    'is_featured' => false,
                    'is_new' => true, // Default
                    'is_hybrid' => false,
                    'is_electric' => false,
                ]
            );

            // 3. Versión (VehicleVersion)
            VehicleVersion::updateOrCreate(
                [
                    'vehicle_model_id' => $vehicleModel->id,
                    'name' => mb_convert_case($versionName, MB_CASE_TITLE, "UTF-8"),
                ],
                [
                    'list_price' => $listPrice,
                    'bonus_price' => $bonusPrice,
                ]
            );

            $rowCount++;
        }

        fclose($handle);

        $this->info("¡Importación finalizada! Se procesaron/actualizaron {$rowCount} versiones exitosamente.");
        return 0;
    }

    /**
     * Limpia el precio eliminando $, comas, puntos y espacios.
     */
    protected function cleanPrice(string $rawPrice): ?int
    {
        // Limpiar todo: espacios, signos $, puntos y convertir a mayúsculas
        $cleaned = str_replace([' ', '$', '.', ','], '', strtoupper($rawPrice));

        // Validación "NO APLICA" u otros strings
        if ($cleaned === 'NOAPLICA' || empty($cleaned) || !is_numeric($cleaned)) {
            return null;
        }

        return (int) $cleaned;
    }
}
