import { API_URL } from '../api';
import type { MarketingScriptData } from '@/components/MarketingScripts';

/**
 * Fetches active marketing scripts from the backend proxy.
 * Revalidates every 1 hour (matching the backend cache TTL).
 */
export async function getMarketingScripts(): Promise<MarketingScriptData[]> {
    try {
        const res = await fetch(`${API_URL}/layout/scripts`, {
            next: { revalidate: 3600 },
            headers: { 'Accept': 'application/json' },
        });
        if (!res.ok) return [];
        const json = await res.json();
        return Array.isArray(json) ? json : [];
    } catch (e) {
        // Fail silently — site loads without marketing scripts rather than breaking
        console.error('Failed to fetch marketing scripts:', e);
        return [];
    }
}
