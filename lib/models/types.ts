/**
 * Tipo de vehículo para segmentación de catálogo.
 * - 'liviano'    → autos SUV, sedán, hatchback, pick-up, furgón, etc.
 * - 'moto'       → motocicletas, scooters
 * - 'camion-bus' → camiones de carga, buses, minibuses
 */
export type VehicleType = 'liviano' | 'moto' | 'camion-bus';

export interface VehicleVersion {
    name: string;
    sapMaterialCode?: string;
    motor?: string;
    /** Tipo de combustible: Gasolina | Diésel | Gas | Híbrido | Eléctrico */
    fuel?: string;
    transmission?: string;
    /** Rendimiento mixto en km/l o kWh/100km para eléctricos */
    consumptionMixed?: string;
    /** Solo para híbridos / eléctricos (ej: "80 km eléctricos") */
    electricRange?: string;
    power?: string;
    torque?: string;
    traction?: string;
    doors?: number;
    seats?: number;
    airbags?: number;
    /** Precio bruto sin descuentos */
    listPrice: number;
    /** Bono directo de la marca (ej: bono fabricante) */
    brandBonus?: number;
    /** Bono por financiamiento bancario / Smart Credit */
    financingBonus?: number;
    /** Precio final con todos los bonos aplicados */
    bonusPrice: number;
    /** @deprecated Usar brandBonus + financingBonus. Se mantiene para retrocompat. */
    bonus?: number;
}

export interface PromotionUnit {
    vin: string;
    versionName: string;
    /** Precio original de lista */
    listPrice?: number;
    /** Descuento adicional sobre el precio con bonos estándar */
    promoBonus: number;
    /** Precio final de venta para esta unidad específica */
    promoPrice: number;
    /** Estado de la unidad: disponible, reservado, vendido */
    status?: string;
    color?: string;
    year?: number;
    /** Comentario adicional (ej: "Unidad Test Drive", "Única unidad") */
    note?: string;
}

export interface Vehicle {
    id: string;
    /** Slug de la marca en minúsculas (ej: 'toyota', 'volkswagen', 'bmw-motorrad') */
    brand: string;
    name: string;
    category: string;
    /** Precio base (menor precio de lista entre todas las versiones) */
    price: number;
    /** URL de la imagen miniatura para las tarjetas del catálogo */
    image: string;
    slogan?: string;
    /** Tipo de vehículo para segmentación (liviano | moto | camion-bus) */
    vehicleType?: VehicleType;
    /** 
     * true = precio IVA incluido (default para autos particulares)
     * false = precio + IVA (comerciales: pick-up carga, camiones, buses)
     */
    ivaIncluded?: boolean;
    isHybrid?: boolean;
    isElectric?: boolean;
    isNew?: boolean;
    isFeatured?: boolean;
    /** Indica si el modelo está en promoción/oferta especial */
    isPromotion?: boolean;
    /** Descuento adicional por promoción vigente */
    promoBonus?: number;
    /** Etiqueta descriptiva global para el modelo en promoción */
    promotionTag?: string;
    /** Unidades específicas en promoción con VIN y precio único */
    promoUnits?: PromotionUnit[];
    /** Características/equipamiento destacado (máx. 4 tarjetas) */
    features?: { title: string; desc: string; icon?: string; image?: string }[];
    /** URLs de imágenes de galería */
    gallery?: string[];
    versions?: VehicleVersion[];
    desktopBanner?: string;
    mobileBanner?: string;
    videoUrl?: string;
}
export interface LandingInfo {
    slug: string;
    title: string;
    subtitle?: string;
    desktop_banner_url?: string;
    mobile_banner_url?: string;
    is_active: boolean;
}
