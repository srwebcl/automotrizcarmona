<?php

namespace App\Filament\Resources\VehicleVersionResource\Pages;

use App\Filament\Resources\VehicleVersionResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListVehicleVersions extends ListRecords
{
    protected static string $resource = VehicleVersionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
