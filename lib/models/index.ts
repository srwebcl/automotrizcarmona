import { TOYOTA_MODELS } from './toyota';
import { VOLKSWAGEN_MODELS } from './volkswagen';
import { AUDI_MODELS } from './audi';
import { HONDA_MODELS } from './honda';
import { CUPRA_MODELS } from './cupra';
import { SEAT_MODELS } from './seat';
import { BMW_MODELS } from './bmw';
import { Vehicle } from './types';

// Registro por marca (mantiene compatibilidad con páginas actuales)
export const MODELS_REGISTRY: Record<string, Vehicle[]> = {
    'toyota': TOYOTA_MODELS,
    'volkswagen': VOLKSWAGEN_MODELS,
    'audi': AUDI_MODELS,
    'honda': HONDA_MODELS,
    'cupra': CUPRA_MODELS,
    'seat': SEAT_MODELS,
    'bmw': BMW_MODELS,
};

// Gran Array Unificado (Sugerencia PRO para filtros globales)
export const ALL_MODELS: Vehicle[] = [
    ...TOYOTA_MODELS,
    ...VOLKSWAGEN_MODELS,
    ...AUDI_MODELS,
    ...HONDA_MODELS,
    ...CUPRA_MODELS,
    ...SEAT_MODELS,
    ...BMW_MODELS,
];
