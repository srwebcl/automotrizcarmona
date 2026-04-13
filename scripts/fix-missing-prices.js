/**
 * fix-missing-prices.js
 * 
 * Carga los precios faltantes para Foton, Dongfeng y Geely Ex2
 * comparando los slugs de Neon con los del csvFallback.
 */

const { Client } = require('./db-migration/node_modules/pg');
const csvFallback = require('../lib/csvFallback.json');

const DB_URL = 'postgresql://neondb_owner:npg_3pIdfLMDo0qH@ep-rough-pine-acw7ii9a-pooler.sa-east-1.aws.neon.tech/carmonaycia?sslmode=verify-full';

function toSlug(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
        .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
}

async function run() {
    const client = new Client({ connectionString: DB_URL });
    await client.connect();
    console.log('✅ Conectado a Neon DB\n');

    // Obtener todos los modelos de las marcas problemáticas con sus versiones
    const target_brands = ['foton-camiones', 'dongfeng', 'geely'];

    const models = await client.query(`
        SELECT vm.id as model_id, vm.name as model_name, vm.slug as model_slug,
               b.slug as brand_slug,
               vv.id as version_id, vv.name as version_name, vv.slug as version_slug,
               vv.list_price
        FROM vehicle_models vm
        JOIN brands b ON vm.brand_id = b.id
        JOIN vehicle_versions vv ON vv.vehicle_model_id = vm.id
        WHERE b.slug = ANY($1)
        AND (vv.list_price IS NULL OR vv.list_price = 0)
        ORDER BY b.slug, vm.slug, vv.name
    `, [target_brands]);

    console.log(`🔍 Versiones sin precio en Foton/Dongfeng/Geely: ${models.rows.length}\n`);
    console.log('Diagnóstico de slugs:\n');

    let updated = 0;
    let notFound = [];

    for (const row of models.rows) {
        const brandData = csvFallback[row.brand_slug];
        if (!brandData) {
            console.log(`  ❌ Marca no encontrada en CSV: ${row.brand_slug}`);
            continue;
        }

        // Intentar encontrar el modelo por slug directo
        let modelData = brandData[row.model_slug];

        // Si no encuentra, buscar por similitud
        if (!modelData) {
            const csvModels = Object.keys(brandData);
            const match = csvModels.find(k =>
                k === row.model_slug ||
                toSlug(k) === toSlug(row.model_slug) ||
                row.model_slug?.includes(k) ||
                k?.includes(row.model_slug?.replace(/-/g, ''))
            );
            if (match) {
                modelData = brandData[match];
                console.log(`  🔗 Match por similitud: Neon="${row.model_slug}" → CSV="${match}"`);
            }
        }

        if (!modelData) {
            notFound.push(`${row.brand_slug}/${row.model_slug} (no en CSV)`);
            console.log(`  ⚠️  Modelo NO encontrado en CSV: [${row.brand_slug}] ${row.model_slug}`);
            continue;
        }

        // Buscar la versión en el modelo
        let versionData = modelData[row.version_slug];

        if (!versionData) {
            // Intentar por slug aproximado
            const csvVersions = Object.keys(modelData);
            const matchV = csvVersions.find(k =>
                toSlug(k) === row.version_slug ||
                row.version_slug?.startsWith(toSlug(k)) ||
                toSlug(k)?.startsWith(row.version_slug)
            );
            if (matchV) {
                versionData = modelData[matchV];
                console.log(`    🔗 Versión match: Neon="${row.version_slug}" → CSV="${matchV}"`);
            }
        }

        if (!versionData) {
            // Mostrar qué versiones hay en el CSV para ese modelo
            const csvVersionKeys = Object.keys(modelData);
            console.log(`  ⚠️  Versión no encontrada: [${row.brand_slug}/${row.model_slug}] "${row.version_name}" (slug: ${row.version_slug})`);
            console.log(`       CSV tiene: ${csvVersionKeys.join(', ')}`);
            notFound.push(`${row.brand_slug}/${row.model_slug}/${row.version_slug}`);
            continue;
        }

        // Actualizar precios
        const listPrice = versionData.listPrice || null;
        const brandBonus = versionData.brandBonus || null;
        const financeBonus = versionData.financingBonus || null;
        const financePrice = versionData.bonusPrice || null;
        const motor = versionData.motor || null;
        const power = versionData.power || null;
        const torque = versionData.torque || null;
        const consumption = versionData.consumptionMixed || null;

        await client.query(`
            UPDATE vehicle_versions SET
                list_price         = COALESCE($1, list_price),
                brand_bonus        = COALESCE($2, brand_bonus),
                finance_bonus      = COALESCE($3, finance_bonus),
                finance_price      = COALESCE($4, finance_price),
                engine             = COALESCE($5, engine),
                power_hp           = COALESCE($6, power_hp),
                torque_nm          = COALESCE($7, torque_nm),
                mixed_performance  = COALESCE($8, mixed_performance),
                updated_at         = NOW()
            WHERE id = $9
        `, [listPrice, brandBonus, financeBonus, financePrice, motor, power, torque, consumption, row.version_id]);

        console.log(`  ✅ [${row.brand_slug}/${row.model_slug}] "${row.version_name}" → $${listPrice}`);
        updated++;
    }

    // Reporte
    console.log(`\n${'='.repeat(60)}`);
    console.log(`✅ Actualizados: ${updated}`);
    console.log(`⚠️  No encontrados: ${notFound.length}`);
    if (notFound.length) {
        console.log('\nItems sin datos en CSV (requieren carga manual):');
        notFound.forEach(i => console.log(`  - ${i}`));
    }

    await client.end();
    console.log('\n🎉 Proceso completado.');
}

run().catch(err => { console.error('❌ Error:', err.message); process.exit(1); });
