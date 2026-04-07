/**
 * sync-neon-full.js
 * 
 * Este script sincroniza Neon DB con los datos del csvFallback.json:
 * 1. Genera slugs para todas las versiones que tienen slug=NULL
 * 2. Rellena los campos técnicos (engine, power_hp, torque_nm, etc.)
 * 3. Rellena brand_bonus, finance_bonus, finance_price
 * 
 * Uso: node scripts/sync-neon-full.js
 */

const { Client } = require('./db-migration/node_modules/pg');
const csvFallback = require('../lib/csvFallback.json');

const DB_URL = 'postgresql://neondb_owner:npg_3pIdfLMDo0qH@ep-rough-pine-acw7ii9a-pooler.sa-east-1.aws.neon.tech/carmonaycia?sslmode=verify-full';

function toSlug(str) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
}

async function run() {
    const client = new Client({ connectionString: DB_URL });
    await client.connect();
    console.log('✅ Conectado a Neon DB\n');

    // === PASO 1: Generar slugs para vehicle_versions ===
    const versionsSinSlug = await client.query(`
        SELECT vv.id, vv.name, vv.vehicle_model_id,
               vm.slug as model_slug, b.slug as brand_slug
        FROM vehicle_versions vv
        JOIN vehicle_models vm ON vv.vehicle_model_id = vm.id
        JOIN brands b ON vm.brand_id = b.id
        WHERE vv.slug IS NULL OR vv.slug = ''
        ORDER BY b.slug, vm.slug, vv.name
    `);

    console.log(`🔄 PASO 1: Generando slugs para ${versionsSinSlug.rows.length} versiones...\n`);
    let slugsActualizados = 0;

    // Rastrear slugs usados para evitar duplicados dentro del mismo scope
    const usedSlugs = new Set();

    // Cargar slugs existentes que ya fueron asignados
    const existingSlugs = await client.query(`SELECT slug FROM vehicle_versions WHERE slug IS NOT NULL AND slug != ''`);
    existingSlugs.rows.forEach(r => usedSlugs.add(r.slug));

    for (const row of versionsSinSlug.rows) {
        let baseSlug = toSlug(row.name);
        let finalSlug = baseSlug;
        let counter = 2;
        
        // Si el slug ya existe, añade un sufijo numérico
        while (usedSlugs.has(finalSlug)) {
            finalSlug = `${baseSlug}-${counter}`;
            counter++;
        }
        
        usedSlugs.add(finalSlug);
        
        await client.query(
            'UPDATE vehicle_versions SET slug = $1, updated_at = NOW() WHERE id = $2',
            [finalSlug, row.id]
        );
        process.stdout.write(`  ✓ [${row.brand_slug}/${row.model_slug}] "${row.name}" -> "${finalSlug}"\n`);
        slugsActualizados++;
    }

    // === PASO 2: Generar slugs para vehicle_models ===
    const modelosSinSlug = await client.query(`
        SELECT vm.id, vm.name, b.slug as brand_slug
        FROM vehicle_models vm
        JOIN brands b ON vm.brand_id = b.id
        WHERE vm.slug IS NULL OR vm.slug = ''
    `);

    if (modelosSinSlug.rows.length > 0) {
        console.log(`\n🔄 PASO 2: Generando slugs para ${modelosSinSlug.rows.length} modelos...\n`);
        for (const row of modelosSinSlug.rows) {
            const newSlug = toSlug(row.name);
            await client.query(
                'UPDATE vehicle_models SET slug = $1, updated_at = NOW() WHERE id = $2',
                [newSlug, row.id]
            );
            process.stdout.write(`  ✓ [${row.brand_slug}] "${row.name}" -> "${newSlug}"\n`);
            slugsActualizados++;
        }
    }

    // === PASO 3: Rellenar datos técnicos desde csvFallback ===
    console.log(`\n🔄 PASO 3: Rellenando datos técnicos desde csvFallback.json...\n`);

    // Cargar todas las versiones con su modelo y marca
    const allVersions = await client.query(`
        SELECT vv.id, vv.name, vv.slug,
               vm.slug as model_slug, b.slug as brand_slug
        FROM vehicle_versions vv
        JOIN vehicle_models vm ON vv.vehicle_model_id = vm.id
        JOIN brands b ON vm.brand_id = b.id
        ORDER BY b.slug, vm.slug
    `);

    let datosActualizados = 0;

    for (const row of allVersions.rows) {
        const brandData = csvFallback[row.brand_slug];
        if (!brandData) continue;

        const modelData = brandData[row.model_slug];
        if (!modelData) continue;

        // Buscar la versión por slug exacto primero, luego por slug aproximado
        let versionData = modelData[row.slug];

        // Si no encuentra por slug exacto, intentar buscar por coincidencia parcial
        if (!versionData) {
            const versionKeys = Object.keys(modelData);
            const matchKey = versionKeys.find(k => 
                toSlug(k) === row.slug || 
                row.slug?.includes(toSlug(k)) || 
                toSlug(k)?.includes(row.slug)
            );
            if (matchKey) versionData = modelData[matchKey];
        }

        if (!versionData) continue;

        // Actualizar con los datos técnicos del CSV
        const updateRes = await client.query(`
            UPDATE vehicle_versions SET
                brand_bonus    = COALESCE(brand_bonus, $1),
                finance_bonus  = COALESCE(finance_bonus, $2),
                finance_price  = COALESCE(finance_price, $3),
                engine         = COALESCE(engine, $4),
                power_hp       = COALESCE(power_hp, $5),
                torque_nm      = COALESCE(torque_nm, $6),
                mixed_performance = COALESCE(mixed_performance, $7),
                updated_at     = NOW()
            WHERE id = $8
        `, [
            versionData.brandBonus || null,
            versionData.financingBonus || null,
            versionData.bonusPrice || null,
            versionData.motor || null,
            versionData.power || null,
            versionData.torque || null,
            versionData.consumptionMixed || null,
            row.id
        ]);

        if (updateRes.rowCount > 0) {
            datosActualizados++;
            process.stdout.write(`  ✓ [${row.brand_slug}/${row.model_slug}] ${row.slug} - datos técnicos OK\n`);
        }
    }

    // === REPORTE FINAL ===
    const finalCheck = await client.query(`
        SELECT 
            COUNT(*) as total,
            COUNT(*) FILTER (WHERE slug IS NULL OR slug = '') as sin_slug,
            COUNT(*) FILTER (WHERE engine IS NOT NULL) as con_motor,
            COUNT(*) FILTER (WHERE finance_bonus IS NOT NULL) as con_bono
        FROM vehicle_versions
    `);

    console.log(`\n\n📊 ===  REPORTE FINAL  ===`);
    console.log(`   Total versiones:        ${finalCheck.rows[0].total}`);
    console.log(`   Sin slug (NULL):        ${finalCheck.rows[0].sin_slug}`);
    console.log(`   Con motor:              ${finalCheck.rows[0].con_motor}`);
    console.log(`   Con bono financiamiento:${finalCheck.rows[0].con_bono}`);
    console.log(`\n✅ Slugs actualizados:     ${slugsActualizados}`);
    console.log(`✅ Datos técnicos cargados: ${datosActualizados}`);

    await client.end();
    console.log('\n🎉 ¡Sincronización completada!');
}

run().catch(err => {
    console.error('\n❌ Error fatal:', err.message);
    process.exit(1);
});
