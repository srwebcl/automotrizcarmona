export interface Vehicle {
    id: string;
    brand: string;      // Identificador de la marca (ej: 'toyota', 'volkswagen')
    name: string;
    category: string;
    price: number;
    image: string;
    slogan?: string;
    isHybrid?: boolean;
    isElectric?: boolean;
    isNew?: boolean;
    // Campos extendidos para la página de detalle
    features?: { title: string; desc: string; icon?: string }[];
    gallery?: string[];
    versions?: { 
        name: string; 
        transmission: string; 
        traction: string; 
        fuel: string; 
        listPrice: number; 
        bonusPrice: number 
    }[];
    desktopBanner?: string;
    mobileBanner?: string;
    videoUrl?: string;
}
