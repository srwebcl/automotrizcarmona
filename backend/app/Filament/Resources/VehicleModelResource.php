<?php

namespace App\Filament\Resources;

use App\Filament\Resources\VehicleModelResource\Pages;
use App\Models\VehicleModel;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Tabs;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class VehicleModelResource extends Resource
{
    protected static ?string $model = VehicleModel::class;

    protected static ?string $navigationIcon = 'heroicon-o-truck';
    
    protected static ?string $navigationGroup = 'Catálogo';

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Tabs::make('Tabs')
                    ->tabs([
                        Tabs\Tab::make('Datos Principales')
                            ->icon('heroicon-o-information-circle')
                            ->schema([
                                Select::make('brand_id')
                                    ->label('Marca')
                                    ->relationship('brand', 'name')
                                    ->searchable()
                                    ->preload()
                                    ->required(),
                                TextInput::make('name')
                                    ->label('Nombre del Modelo')
                                    ->required()
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(fn ($state, $set) => $set('slug', Str::slug($state))),
                                TextInput::make('slug')
                                    ->label('Slug / URL')
                                    ->required()
                                    ->readOnly()
                                    ->unique(ignoreRecord: true),
                                TextInput::make('slogan')
                                    ->label('Eslogan (Slogan)'),
                                TextInput::make('category')
                                    ->label('Categoría (SUV, Sedán, etc.)'),
                                TextInput::make('base_price')
                                    ->label('Precio Base (Referencial)')
                                    ->numeric()
                                    ->prefix('$'),
                                Forms\Components\Group::make([
                                    Toggle::make('is_new')
                                        ->label('¿Es Nuevo?'),
                                    Toggle::make('is_hybrid')
                                        ->label('Híbrido'),
                                    Toggle::make('is_electric')
                                        ->label('Eléctrico'),
                                ])->columns(3),
                                Textarea::make('description')
                                    ->label('Descripción Principal')
                                    ->columnSpanFull(),
                            ])->columns(2),

                        Tabs\Tab::make('Multimedia')
                            ->icon('heroicon-o-photo')
                            ->schema([
                                FileUpload::make('thumbnail_url')
                                    ->label('Miniatura (Thumbnail)')
                                    ->image()
                                    ->directory('models/thumbnails')
                                    ->columnSpanFull(),
                                FileUpload::make('desktop_banner_url')
                                    ->label('Banner Desktop')
                                    ->image()
                                    ->directory('models/banners'),
                                FileUpload::make('mobile_banner_url')
                                    ->label('Banner Mobile')
                                    ->image()
                                    ->directory('models/banners'),
                                TextInput::make('video_url')
                                    ->label('URL de Video (YouTube/Vimeo)')
                                    ->url()
                                    ->placeholder('https://www.youtube.com/...')
                                    ->columnSpanFull(),
                                FileUpload::make('gallery')
                                    ->label('Galería de Imágenes')
                                    ->multiple()
                                    ->image()
                                    ->reorderable()
                                    ->directory('models/galleries')
                                    ->columnSpanFull(),
                            ])->columns(2),

                        Tabs\Tab::make('Versiones y Precios')
                            ->icon('heroicon-o-currency-dollar')
                            ->schema([
                                Repeater::make('vehicleVersions')
                                    ->label('Versiones del Modelo')
                                    ->relationship()
                                    ->schema([
                                        TextInput::make('name')
                                            ->label('Nombre de Versión')
                                            ->required(),
                                        TextInput::make('transmission')
                                            ->label('Transmisión'),
                                        TextInput::make('traction')
                                            ->label('Tracción'),
                                        TextInput::make('fuel')
                                            ->label('Combustible'),
                                        TextInput::make('list_price')
                                            ->label('Precio Lista')
                                            ->numeric()
                                            ->prefix('$'),
                                        TextInput::make('bonus_price')
                                            ->label('Bono Financiamiento')
                                            ->numeric()
                                            ->prefix('$'),
                                    ])
                                    ->columns(2)
                                    ->collapsible()
                                    ->itemLabel(fn (array $state): ?string => $state['name'] ?? 'Nueva Versión'),
                            ]),

                        Tabs\Tab::make('Equipamiento Destacado')
                            ->icon('heroicon-o-star')
                            ->schema([
                                Repeater::make('features')
                                    ->label('Características')
                                    ->relationship()
                                    ->schema([
                                        TextInput::make('title')
                                            ->label('Título de Característica')
                                            ->required(),
                                        Textarea::make('description')
                                            ->label('Descripción / Detalle'),
                                        FileUpload::make('image_url')
                                            ->label('Imagen / Icono')
                                            ->image()
                                            ->directory('models/features'),
                                    ])
                                    ->collapsible()
                                    ->itemLabel(fn (array $state): ?string => $state['title'] ?? 'Nueva Característica'),
                            ]),
                    ])->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('thumbnail_url')
                    ->label('Imagen'),
                TextColumn::make('brand.name')
                    ->label('Marca')
                    ->sortable(),
                TextColumn::make('name')
                    ->label('Modelo')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('category')
                    ->label('Categoría')
                    ->sortable(),
                TextColumn::make('base_price')
                    ->label('Precio Base')
                    ->money('CLP')
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_new')
                    ->label('Nuevo')
                    ->boolean(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('brand')
                    ->label('Marca')
                    ->relationship('brand', 'name'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
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
            'index' => Pages\ListVehicleModels::route('/'),
            'create' => Pages\CreateVehicleModel::route('/create'),
            'edit' => Pages\EditVehicleModel::route('/{record}/edit'),
        ];
    }

    public static function getModelLabel(): string
    {
        return 'Modelo de Vehículo';
    }

    public static function getPluralModelLabel(): string
    {
        return 'Modelos de Vehículos';
    }
}
