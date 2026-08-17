/**
 * Utilidades para RUT chileno, compartidas entre frontend y backend.
 * Un solo lugar con el algoritmo de dígito verificador (módulo 11) para
 * no tener la misma lógica duplicada y potencialmente desincronizada
 * entre el formulario (validación en vivo) y la integración con
 * Mulesoft/Salesforce (normalización antes de enviar).
 */

/** Deja solo dígitos y k/K, sacando puntos, guiones, espacios, etc. */
export function cleanRut(raw: string): string {
    if (!raw) return '';
    return raw.replace(/[^0-9kK]/g, '');
}

/** Calcula el dígito verificador esperado para un cuerpo de RUT (algoritmo módulo 11). */
export function computeDv(body: string): string {
    let sum = 0;
    let multiplier = 2;
    for (let i = body.length - 1; i >= 0; i--) {
        sum += parseInt(body[i], 10) * multiplier;
        multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }
    const remainder = 11 - (sum % 11);
    return remainder === 11 ? '0' : remainder === 10 ? 'k' : String(remainder);
}

/** Valida que el RUT tenga un dígito verificador matemáticamente correcto. */
export function isValidRut(raw: string): boolean {
    const clean = cleanRut(raw);
    if (clean.length < 2) return false;
    const body = clean.slice(0, -1);
    const dv = clean.slice(-1).toLowerCase();
    return computeDv(body) === dv;
}

/**
 * Normaliza al formato "cuerpo-DV" sin puntos (ej: "13360037-k"), que es lo
 * que espera la integración Mulesoft/Salesforce. Solo reordena lo que venga
 * (no valida el DV) — pensado para usarse como "mejor esfuerzo" del lado
 * del servidor, sin importar cómo haya llegado el dato.
 */
export function formatRut(raw: string): string {
    const clean = cleanRut(raw);
    if (clean.length < 2) return clean;
    const body = clean.slice(0, -1);
    const dv = clean.slice(-1).toLowerCase();
    return `${body}-${dv}`;
}

/**
 * Formatea con puntos de miles + guión para mostrar en el input mientras el
 * usuario escribe (ej: "17.625.818-7"). Pensado para llamarse en cada
 * keystroke (onChange) de un campo controlado.
 */
export function formatRutMasked(raw: string): string {
    const clean = cleanRut(raw).toUpperCase();
    if (clean.length < 2) return clean;

    const body = clean.slice(0, -1);
    const dv = clean.slice(-1);

    const groups: string[] = [];
    let remaining = body;
    while (remaining.length > 3) {
        groups.unshift(remaining.slice(-3));
        remaining = remaining.slice(0, -3);
    }
    if (remaining.length > 0) groups.unshift(remaining);

    return `${groups.join('.')}-${dv}`;
}
