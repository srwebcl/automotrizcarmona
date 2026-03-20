<?php

namespace App\Filament\Resources;

use App\Filament\Resources\VehicleVersionResource\Pages;
use App\Models\VehicleVersion;
use Filament\Forms;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class VehicleVersionResource extends Resource
{
    protected static ?string $model = VehicleVersion::class;

    protected static ?string $navigationIcon = 'heroicon-o-adjustments-horizontal';
    
    protected static bool $shouldRegisterNavigation = false;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('vehicle_model_id')
                    ->relationship('vehicleModel', 'name')
                    ->required(),
                TextInput::make('name')
                    ->required(),
                TextInput::make('price')
                    ->numeric()
                    ->prefix('$')
                    ->required(),
                TextInput::make('year')
                    ->numeric()
                    ->required(),
                TextInput::make('transmission')
                    ->required(),
                TextInput::make('fuel_type')
                    ->required(),
                TextInput::make('engine_size'),
                Select::make('features')
                    ->multiple()
                    ->relationship('features', 'name')
                    ->preload(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('vehicleModel.brand.name')->label('Marca'),
                TextColumn::make('vehicleModel.name')->label('Modelo')->sortable(),
                TextColumn::make('name')->searchable()->sortable(),
                TextColumn::make('price')->money('CLP')->sortable(),
                TextColumn::make('year')->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('vehicleModel')
                    ->relationship('vehicleModel', 'name'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListVehicleVersions::route('/'),
            'create' => Pages\CreateVehicleVersion::route('/create'),
            'edit' => Pages\EditVehicleVersion::route('/{record}/edit'),
        ];
    }
}
