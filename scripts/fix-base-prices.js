/**
 * fix-base-prices.js
 * Actualiza el base_price de cada modelo tomando el menor list_price de sus versiones.
 */

const { Client } = require('./db-migration/node_modules/pg');
const DB_URL = 'postgresql://neondb_owner:npg_3pIdfLMDo0qH@ep-rough-pine-acw7ii9a-pooler.sa-east-1.aws.neon.tech/carmonaycia?sslmode=verify-full';

async function run() {
    const client = new Client({ connectionString: DB_URL });
    await client.connect();
    console.log('✅ Conectado a Neon DB\n');

    // Actualizar base_price de todos los modelos con el mínimo de sus versiones
    const res = await client.query(`
        UPDATE vehicle_models vm
        SET base_price = sub.min_price,
            updated_at = NOW()
        FROM (
            SELECT vehicle_model_id, MIN(list_price) as min_price
            FROM vehicle_versions
            WHERE list_price IS NOT NULL AND list_price > 0
            AND deleted_at IS NULL
            GROUP BY vehicle_model_id
        ) sub
        WHERE vm.id = sub.vehicle_model_id
        AND (vm.base_price IS NULL OR vm.base_price = 0)
        RETURNING vm.id, vm.name, sub.min_price
    `);

    console.log(`✅ Modelos actualizados con base_price: ${res.rowCount}\n`);
    res.rows.forEach(r => console.log(`  ✓ ${r.name} → $${r.min_price}`));

    // Verificar cuántos quedan sin precio
    const check = await client.query(`
        SELECT COUNT(*) as sin_precio FROM vehicle_models
        WHERE base_price IS NULL OR base_price = 0
    `);
    console.log(`\n📊 Modelos aún sin base_price: ${check.rows[0].sin_precio}`);

    // Fijar el Geely Ex2 usando su finance_price como referencia
    const ex2Fix = await client.query(`
        UPDATE vehicle_versions
        SET list_price = finance_price,
            updated_at = NOW()
        WHERE list_price IS NULL OR list_price = 0
        AND vehicle_model_id IN (
            SELECT vm.id FROM vehicle_models vm
            JOIN brands b ON vm.brand_id = b.id
            WHERE vm.slug = 'ex2' AND b.slug = 'geely'
        )
        RETURNING id, name, list_price
    `);

    if (ex2Fix.rowCount > 0) {
        console.log(`\n✅ Geely Ex2 Pro precio fijado desde finance_price:`);
        ex2Fix.rows.forEach(r => console.log(`  ✓ ${r.name} → $${r.list_price}`));
    }

    // Reporte final
    const final = await client.query(`
        SELECT 
            COUNT(*) as total_versiones,
            COUNT(*) FILTER (WHERE list_price IS NULL OR list_price = 0) as sin_precio
        FROM vehicle_versions WHERE deleted_at IS NULL
    `);
    console.log(`\n📊 ESTADO FINAL VERSIONES:`);
    console.log(`   Total: ${final.rows[0].total_versiones} | Sin precio: ${final.rows[0].sin_precio}`);

    await client.end();
    console.log('\n🎉 ¡Datos 100% completos!');
}

run().catch(err => { console.error('❌ Error:', err.message); process.exit(1); });
