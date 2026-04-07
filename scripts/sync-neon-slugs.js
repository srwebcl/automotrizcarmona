/**
 * sync-neon-slugs.js
 * 
 * Lee las versiones que tienen slug=NULL en Neon y las actualiza
 * generando el slug a partir del nombre de la versión.
 * 
 * Uso: node scripts/sync-neon-slugs.js
 */

const { Client } = require('./db-migration/node_modules/pg');

const DB_URL = 'postgresql://neondb_owner:npg_3pIdfLMDo0qH@ep-rough-pine-acw7ii9a-pooler.sa-east-1.aws.neon.tech/carmonaycia?sslmode=require';

function toSlug(str) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // remove accents
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')   // remove special chars
        .replace(/\s+/g, '-')            // spaces to hyphens
        .replace(/-+/g, '-');            // collapse multiple hyphens
}

async function run() {
    const client = new Client({ connectionString: DB_URL });
    await client.connect();
    console.log('✅ Conectado a Neon DB');

    // 1. Verificar estado actual
    const countRes = await client.query(`
        SELECT COUNT(*) as total,
               COUNT(*) FILTER (WHERE slug IS NULL OR slug = '') as sin_slug
        FROM vehicle_versions
    `);
    console.log(`\n📊 Estado actual vehicle_versions:`);
    console.log(`   Total registros: ${countRes.rows[0].total}`);
    console.log(`   Sin slug (NULL): ${countRes.rows[0].sin_slug}`);

    // 2. Obtener todas las versiones sin slug
    const versionsRes = await client.query(`
        SELECT vv.id, vv.name, vv.slug, vm.slug as model_slug, b.slug as brand_slug
        FROM vehicle_versions vv
        JOIN vehicle_models vm ON vv.model_id = vm.id
        JOIN brands b ON vm.brand_id = b.id
        WHERE vv.slug IS NULL OR vv.slug = ''
        ORDER BY b.slug, vm.slug
    `);

    console.log(`\n🔄 Actualizando ${versionsRes.rows.length} versiones sin slug...\n`);

    let updated = 0;
    let errors = 0;

    for (const row of versionsRes.rows) {
        const newSlug = toSlug(row.name);
        try {
            await client.query(
                'UPDATE vehicle_versions SET slug = $1 WHERE id = $2',
                [newSlug, row.id]
            );
            console.log(`   ✓ [${row.brand_slug}/${row.model_slug}] "${row.name}" -> "${newSlug}"`);
            updated++;
        } catch (err) {
            console.log(`   ✗ Error en ID ${row.id}: ${err.message}`);
            errors++;
        }
    }

    // 3. También actualizar slugs de vehicle_models si tienen NULL
    const modelsRes = await client.query(`
        SELECT vm.id, vm.name, vm.slug, b.slug as brand_slug
        FROM vehicle_models vm
        JOIN brands b ON vm.brand_id = b.id
        WHERE vm.slug IS NULL OR vm.slug = ''
    `);

    if (modelsRes.rows.length > 0) {
        console.log(`\n🔄 Actualizando ${modelsRes.rows.length} modelos sin slug...`);
        for (const row of modelsRes.rows) {
            const newSlug = toSlug(row.name);
            await client.query(
                'UPDATE vehicle_models SET slug = $1 WHERE id = $2',
                [newSlug, row.id]
            );
            console.log(`   ✓ [${row.brand_slug}] "${row.name}" -> "${newSlug}"`);
            updated++;
        }
    }

    // 4. Reporte final
    const finalRes = await client.query(`
        SELECT COUNT(*) as total,
               COUNT(*) FILTER (WHERE slug IS NULL OR slug = '') as sin_slug
        FROM vehicle_versions
    `);
    console.log(`\n📊 Estado FINAL vehicle_versions:`);
    console.log(`   Total registros: ${finalRes.rows[0].total}`);
    console.log(`   Sin slug (NULL): ${finalRes.rows[0].sin_slug}`);
    console.log(`\n✅ Proceso completado: ${updated} actualizados, ${errors} errores`);

    await client.end();
}

run().catch(err => {
    console.error('❌ Error fatal:', err.message);
    process.exit(1);
});
