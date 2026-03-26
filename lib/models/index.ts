import { TOYOTA_MODELS } from './toyota';
import { VOLKSWAGEN_MODELS } from './volkswagen';
import { AUDI_MODELS } from './audi';
import { HONDA_MODELS } from './honda';
import { CUPRA_MODELS } from './cupra';
import { SEAT_MODELS } from './seat';
import { BMW_MODELS } from './bmw';
import { BMW_MOTORRAD_MODELS } from './bmw-motorrad';
import { MINI_MODELS } from './mini';
import { MAXUS_MODELS } from './maxus';
import { JETOUR_MODELS } from './jetour';
import { SOUEAST_MODELS } from './soueast';
import { KAIYI_MODELS } from './kaiyi';
import { Vehicle } from './types';

// Registro por marca (Slug -> Array de modelos)
export const MODELS_REGISTRY: Record<string, Vehicle[]> = {
    'toyota': TOYOTA_MODELS,
    'volkswagen': VOLKSWAGEN_MODELS,
    'audi': AUDI_MODELS,
    'honda': HONDA_MODELS,
    'cupra': CUPRA_MODELS,
    'seat': SEAT_MODELS,
    'bmw': BMW_MODELS,
    'bmw-motorrad': BMW_MOTORRAD_MODELS,
    'mini': MINI_MODELS,
    'maxus': MAXUS_MODELS,
    'jetour': JETOUR_MODELS,
    'soueast': SOUEAST_MODELS,
    'kaiyi': KAIYI_MODELS,
};

// Array unificado para filtros globales
export const ALL_MODELS: Vehicle[] = [
    ...TOYOTA_MODELS,
    ...VOLKSWAGEN_MODELS,
    ...AUDI_MODELS,
    ...HONDA_MODELS,
    ...CUPRA_MODELS,
    ...SEAT_MODELS,
    ...BMW_MODELS,
    ...BMW_MOTORRAD_MODELS,
    ...MINI_MODELS,
    ...MAXUS_MODELS,
    ...JETOUR_MODELS,
    ...SOUEAST_MODELS,
    ...KAIYI_MODELS,
];
