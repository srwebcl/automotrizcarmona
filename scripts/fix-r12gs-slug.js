/**
 * fix-r12gs-slug.js
 * Corrige el slug del R 12 G/S en Neon DB de 'r-12-gs' a 'r-12-g-s'
 * para que coincida con la ruta en Cloudflare R2 y assetMap.json
 */

const { Client } = require('./db-migration/node_modules/pg');
const DB_URL = 'postgresql://neondb_owner:npg_3pIdfLMDo0qH@ep-rough-pine-acw7ii9a-pooler.sa-east-1.aws.neon.tech/carmonaycia?sslmode=verify-full';

async function run() {
    const client = new Client({ connectionString: DB_URL });
    await client.connect();

    // Verificar estado actual
    const before = await client.query(`
        SELECT vm.id, vm.name, vm.slug, b.name as brand
        FROM vehicle_models vm
        JOIN brands b ON vm.brand_id = b.id
        WHERE b.slug = 'bmw-motorrad' AND vm.slug = 'r-12-gs'
    `);

    if (before.rows.length === 0) {
        console.log('⚠️  No se encontró el modelo con slug "r-12-gs". Verificando si ya está corregido...');
        const check = await client.query(`SELECT id, name, slug FROM vehicle_models WHERE slug LIKE 'r-12%' AND brand_id IN (SELECT id FROM brands WHERE slug = 'bmw-motorrad')`);
        check.rows.forEach(r => console.log(`  → Encontrado: id=${r.id} | name="${r.name}" | slug="${r.slug}"`));
        await client.end();
        return;
    }

    console.log(`🔍 Encontrado: ID=${before.rows[0].id} | "${before.rows[0].name}" | slug actual: "${before.rows[0].slug}"`);

    // Corregir slug
    const res = await client.query(`
        UPDATE vehicle_models
        SET slug = 'r-12-g-s', updated_at = NOW()
        WHERE id = $1
        RETURNING id, name, slug
    `, [before.rows[0].id]);

    console.log(`✅ Slug corregido: "${before.rows[0].slug}" → "${res.rows[0].slug}"`);
    console.log(`\nAhora el modelo apunta a la misma ruta que Cloudflare R2:`);
    console.log(`  → autos-nuevos/bmw-motorrad/modelos/r-12-g-s/thumb.webp ✅`);

    await client.end();
    console.log('\n🎉 ¡Corrección aplicada!');
}

run().catch(err => { console.error('❌ Error:', err.message); process.exit(1); });
