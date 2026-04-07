/**
 * fix-bonos-dongfeng-foton.js
 * 
 * 1. Calcula finance_bonus = list_price - finance_price para Dongfeng y Foton
 * 2. Fija list_price de Geely Ex2 Pro en $16.990.000
 */

const { Client } = require('./db-migration/node_modules/pg');
const DB_URL = 'postgresql://neondb_owner:npg_3pIdfLMDo0qH@ep-rough-pine-acw7ii9a-pooler.sa-east-1.aws.neon.tech/carmonaycia?sslmode=verify-full';

async function run() {
    const client = new Client({ connectionString: DB_URL });
    await client.connect();
    console.log('✅ Conectado a Neon DB\n');

    // ── 1. Calcular finance_bonus = list_price - finance_price para Dongfeng y Foton ──
    console.log('🔄 PASO 1: Calculando finance_bonus para Dongfeng y Foton...\n');

    const bonosRes = await client.query(`
        UPDATE vehicle_versions vv
        SET finance_bonus = vv.list_price - vv.finance_price,
            updated_at = NOW()
        FROM vehicle_models vm
        JOIN brands b ON vm.brand_id = b.id
        WHERE vv.vehicle_model_id = vm.id
        AND b.slug IN ('dongfeng', 'foton')
        AND vv.list_price IS NOT NULL AND vv.list_price > 0
        AND vv.finance_price IS NOT NULL AND vv.finance_price > 0
        AND (vv.finance_bonus IS NULL OR vv.finance_bonus = 0)
        AND vv.list_price > vv.finance_price
        RETURNING vv.id, vv.name, b.slug as marca, vv.list_price, vv.finance_price, (vv.list_price - vv.finance_price) as bono_calculado
    `);

    console.log(`✅ Bonos calculados: ${bonosRes.rowCount} versiones\n`);
    bonosRes.rows.forEach(r => {
        console.log(`  ✓ [${r.marca}] ${r.name}`);
        console.log(`      Lista: $${Number(r.list_price).toLocaleString('es-CL')} | Financ: $${Number(r.finance_price).toLocaleString('es-CL')} | Bono: $${Number(r.bono_calculado).toLocaleString('es-CL')}`);
    });

    // ── 2. Corregir Geely Ex2 Pro - precio lista $16.990.000 ──
    console.log('\n🔄 PASO 2: Corrigiendo Geely Ex2 Pro...\n');

    const ex2Res = await client.query(`
        UPDATE vehicle_versions vv
        SET list_price = 16990000,
            updated_at = NOW()
        FROM vehicle_models vm
        JOIN brands b ON vm.brand_id = b.id
        WHERE vv.vehicle_model_id = vm.id
        AND b.slug = 'geely'
        AND vm.slug = 'ex2'
        RETURNING vv.id, vv.name, vv.list_price, vv.finance_price
    `);

    if (ex2Res.rowCount > 0) {
        console.log(`✅ Geely Ex2 actualizado:`);
        ex2Res.rows.forEach(r => console.log(`  ✓ ${r.name} → Lista: $${Number(r.list_price).toLocaleString('es-CL')} | Financ: $${Number(r.finance_price).toLocaleString('es-CL')}`));
    }

    // También actualizar el base_price del modelo Ex2
    await client.query(`
        UPDATE vehicle_models vm
        SET base_price = 16990000, updated_at = NOW()
        FROM brands b
        WHERE vm.brand_id = b.id AND b.slug = 'geely' AND vm.slug = 'ex2'
    `);
    console.log('  ✓ base_price del modelo Ex2 actualizado a $16.990.000');

    // ── Verificación final ──
    console.log('\n📊 VERIFICACIÓN FINAL:\n');

    const check = await client.query(`
        SELECT b.slug as marca, COUNT(*) as total,
               COUNT(*) FILTER (WHERE vv.finance_bonus IS NOT NULL AND vv.finance_bonus > 0) as con_bono_financ,
               COUNT(*) FILTER (WHERE vv.list_price IS NULL OR vv.list_price = 0) as sin_precio
        FROM vehicle_versions vv
        JOIN vehicle_models vm ON vv.vehicle_model_id = vm.id
        JOIN brands b ON vm.brand_id = b.id
        WHERE b.slug IN ('dongfeng', 'foton', 'geely')
        GROUP BY b.slug ORDER BY b.slug
    `);

    check.rows.forEach(r => {
        console.log(`  ${r.marca.toUpperCase()}: ${r.total} versiones | Con bono financ: ${r.con_bono_financ} | Sin precio: ${r.sin_precio}`);
    });

    await client.end();
    console.log('\n🎉 ¡Correcciones aplicadas!');
}

run().catch(err => { console.error('❌ Error:', err.message); process.exit(1); });
