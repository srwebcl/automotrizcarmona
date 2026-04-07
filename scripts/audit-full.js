/**
 * audit-full.js
 * 
 * Auditoría completa del estado de Neon DB vs la API de producción.
 * Verifica: marcas, modelos, versiones, slugs, precios y datos técnicos.
 * 
 * Uso: node scripts/audit-full.js
 */

const { Client } = require('./db-migration/node_modules/pg');

const DB_URL = 'postgresql://neondb_owner:npg_3pIdfLMDo0qH@ep-rough-pine-acw7ii9a-pooler.sa-east-1.aws.neon.tech/carmonaycia?sslmode=verify-full';

async function run() {
    const client = new Client({ connectionString: DB_URL });
    await client.connect();
    console.log('✅ Conectado a Neon DB\n');
    console.log('='.repeat(70));
    console.log('  AUDITORÍA COMPLETA - AUTOMOTRIZ CARMONA');
    console.log('='.repeat(70));

    // ── 1. MARCAS ──────────────────────────────────────────────────────────
    const brands = await client.query(`
        SELECT id, name, slug, is_active
        FROM brands
        ORDER BY name
    `);

    console.log(`\n📌 MARCAS (${brands.rows.length} total)\n`);
    const brandIssues = [];
    for (const b of brands.rows) {
        const icon = b.is_active ? '✅' : '🔴';
        const slugOk = b.slug && b.slug.trim() !== '';
        if (!slugOk) brandIssues.push(`   ⚠️  Marca SIN SLUG: ${b.name} (ID: ${b.id})`);
        console.log(`  ${icon} [${b.id}] ${b.name} → slug: "${b.slug}" | activa: ${b.is_active}`);
    }
    if (brandIssues.length) brandIssues.forEach(i => console.log(i));

    // ── 2. MODELOS por marca ──────────────────────────────────────────────
    console.log(`\n${'─'.repeat(70)}`);
    console.log(`\n📦 MODELOS POR MARCA\n`);

    const models = await client.query(`
        SELECT vm.id, vm.name, vm.slug, vm.is_active, vm.is_featured,
               vm.base_price, b.name as brand_name, b.slug as brand_slug,
               COUNT(vv.id) as version_count
        FROM vehicle_models vm
        JOIN brands b ON vm.brand_id = b.id
        LEFT JOIN vehicle_versions vv ON vv.vehicle_model_id = vm.id
        GROUP BY vm.id, vm.name, vm.slug, vm.is_active, vm.is_featured,
                 vm.base_price, b.name, b.slug
        ORDER BY b.name, vm.name
    `);

    let currentBrand = '';
    let modelIssues = [];
    let totalModels = 0;
    let activeModels = 0;

    for (const m of models.rows) {
        if (m.brand_name !== currentBrand) {
            currentBrand = m.brand_name;
            console.log(`\n  🏷️  ${currentBrand.toUpperCase()} (slug: ${m.brand_slug})`);
        }
        totalModels++;
        if (m.is_active) activeModels++;

        const slugOk = m.slug && m.slug.trim() !== '';
        const hasVersions = parseInt(m.version_count) > 0;
        const hasPrice = m.base_price && parseInt(m.base_price) > 0;
        const icon = m.is_active ? (hasVersions ? '✅' : '⚠️ ') : '🔴';

        let flags = [];
        if (!slugOk) flags.push('SIN SLUG');
        if (!hasVersions) flags.push('SIN VERSIONES');
        if (!hasPrice) flags.push('SIN PRECIO BASE');

        const flagStr = flags.length ? ` ← ⚠️  ${flags.join(' | ')}` : '';
        console.log(`     ${icon} ${m.name} (slug: "${m.slug}") | versiones: ${m.version_count} | precio: $${m.base_price}${flagStr}`);

        if (flags.length) modelIssues.push(`${m.brand_name} / ${m.name}: ${flags.join(', ')}`);
    }

    // ── 3. VERSIONES - estadísticas ───────────────────────────────────────
    console.log(`\n${'─'.repeat(70)}`);
    console.log(`\n📊 ESTADÍSTICAS DE VERSIONES\n`);

    const vStats = await client.query(`
        SELECT 
            COUNT(*) as total,
            COUNT(*) FILTER (WHERE slug IS NULL OR slug = '') as sin_slug,
            COUNT(*) FILTER (WHERE list_price IS NULL OR list_price = 0) as sin_precio,
            COUNT(*) FILTER (WHERE brand_bonus IS NOT NULL AND brand_bonus > 0) as con_bono_marca,
            COUNT(*) FILTER (WHERE finance_bonus IS NOT NULL AND finance_bonus > 0) as con_bono_financ,
            COUNT(*) FILTER (WHERE finance_price IS NOT NULL AND finance_price > 0) as con_precio_financ,
            COUNT(*) FILTER (WHERE engine IS NOT NULL AND engine != '') as con_motor,
            COUNT(*) FILTER (WHERE power_hp IS NOT NULL AND power_hp != '') as con_potencia,
            COUNT(*) FILTER (WHERE torque_nm IS NOT NULL AND torque_nm != '') as con_torque,
            COUNT(*) FILTER (WHERE mixed_performance IS NOT NULL AND mixed_performance != '') as con_consumo,
            COUNT(*) FILTER (WHERE airbags IS NOT NULL) as con_airbags
        FROM vehicle_versions
        WHERE deleted_at IS NULL
    `);

    const s = vStats.rows[0];
    console.log(`   Total versiones:              ${s.total}`);
    console.log(`   Sin slug (NULL):              ${s.sin_slug} ${s.sin_slug > 0 ? '⚠️' : '✅'}`);
    console.log(`   Sin precio lista:             ${s.sin_precio} ${s.sin_precio > 0 ? '⚠️' : '✅'}`);
    console.log(`   Con bono marca:               ${s.con_bono_marca}`);
    console.log(`   Con bono financiamiento:      ${s.con_bono_financ}`);
    console.log(`   Con precio financiamiento:    ${s.con_precio_financ}`);
    console.log(`   Con motor:                    ${s.con_motor} ${parseInt(s.con_motor) < parseInt(s.total) * 0.5 ? '⚠️' : '✅'}`);
    console.log(`   Con potencia (HP):            ${s.con_potencia}`);
    console.log(`   Con torque (Nm):              ${s.con_torque}`);
    console.log(`   Con consumo mixto:            ${s.con_consumo}`);
    console.log(`   Con airbags:                  ${s.con_airbags}`);

    // ── 4. VERSIONES SIN PRECIO ───────────────────────────────────────────
    const sinPrecio = await client.query(`
        SELECT vv.id, vv.name, vm.name as modelo, b.name as marca
        FROM vehicle_versions vv
        JOIN vehicle_models vm ON vv.vehicle_model_id = vm.id
        JOIN brands b ON vm.brand_id = b.id
        WHERE (vv.list_price IS NULL OR vv.list_price = 0)
        AND vv.deleted_at IS NULL
        ORDER BY b.name, vm.name
    `);

    if (sinPrecio.rows.length > 0) {
        console.log(`\n${'─'.repeat(70)}`);
        console.log(`\n⚠️  VERSIONES SIN PRECIO LISTA (${sinPrecio.rows.length})\n`);
        sinPrecio.rows.forEach(r => console.log(`   🔴 ${r.marca} / ${r.modelo} / ${r.name}`));
    }

    // ── 5. MODELOS SIN VERSIONES ──────────────────────────────────────────
    const sinVersiones = await client.query(`
        SELECT vm.name, b.name as marca
        FROM vehicle_models vm
        JOIN brands b ON vm.brand_id = b.id
        LEFT JOIN vehicle_versions vv ON vv.vehicle_model_id = vm.id AND vv.deleted_at IS NULL
        WHERE vm.is_active = true AND vv.id IS NULL
        ORDER BY b.name, vm.name
    `);

    if (sinVersiones.rows.length > 0) {
        console.log(`\n${'─'.repeat(70)}`);
        console.log(`\n⚠️  MODELOS ACTIVOS SIN VERSIONES (${sinVersiones.rows.length})\n`);
        sinVersiones.rows.forEach(r => console.log(`   🔴 ${r.marca} / ${r.name}`));
    }

    // ── RESUMEN FINAL ─────────────────────────────────────────────────────
    console.log(`\n${'='.repeat(70)}`);
    console.log(`\n✅ RESUMEN FINAL`);
    console.log(`\n   Marcas:         ${brands.rows.length} total | ${brands.rows.filter(b => b.is_active).length} activas`);
    console.log(`   Modelos:        ${totalModels} total | ${activeModels} activos`);
    console.log(`   Versiones:      ${s.total} total | ${s.sin_slug} sin slug | ${s.sin_precio} sin precio`);
    console.log(`   Problemas:      ${modelIssues.length + parseInt(s.sin_slug) + parseInt(s.sin_precio)} items requieren atención`);
    console.log(`\n${'='.repeat(70)}\n`);

    await client.end();
}

run().catch(err => {
    console.error('\n❌ Error fatal:', err.message);
    process.exit(1);
});
