'use client';

import React, { useEffect, useState } from 'react';
import CarAdvisorSection, { CarAdvisorData } from './CarAdvisorSection';

const API_BASE = (process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api.automotrizcarmona.cl').replace(/\/+$/, '');

interface Props {
    brandFilter?: string;
    /** Filter by reason type: 'servicio' | 'ventas' | 'repuestos' */
    reasonFilter?: string;
}

export default function CarAdvisorSectionClient({ brandFilter, reasonFilter }: Props) {
    const [data, setData] = useState<CarAdvisorData | null>(null);

    useEffect(() => {
        fetch(`${API_BASE}/api/v1/caradvisor`, { headers: { Accept: 'application/json' } })
            .then(r => r.ok ? r.json() : null)
            .then(json => { if (json) setData(json); })
            .catch(() => {});
    }, []);

    if (!data) return null;

    return <CarAdvisorSection data={data} brandFilter={brandFilter} reasonFilter={reasonFilter} />;
}
