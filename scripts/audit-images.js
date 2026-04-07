/**
 * audit-images.js
 * 
 * Compara los slugs de modelos en Neon DB con las rutas de imágenes
 * en assetMap.json (Cloudflare R2) para detectar desincronizaciones.
 */

const { Client } = require('./db-migration/node_modules/pg');
const assetMap = require('../lib/assetMap.json');

const DB_URL = 'postgresql://neondb_owner:npg_3pIdfLMDo0qH@ep-rough-pine-acw7ii9a-pooler.sa-east-1.aws.neon.tech/carmonaycia?sslmode=verify-full';

const CDN_BASE = 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev';

async function run() {
    const client = new Client({ connectionString: DB_URL });
    await client.connect();

    console.log('='.repeat(72));
    console.log('  AUDITORÍA DE IMÁGENES: Neon DB ↔ Cloudflare R2 (assetMap.json)');
    console.log('='.repeat(72));

    // Obtener todos los modelos activos de Neon con su slug y thumbnail_url actual
    const models = await client.query(`
        SELECT vm.id, vm.name, vm.slug, vm.thumbnail_url,
               b.slug as brand_slug, b.name as brand_name
        FROM vehicle_models vm
        JOIN brands b ON vm.brand_id = b.id
        WHERE vm.is_active = true AND vm.deleted_at IS NULL
        ORDER BY b.name, vm.name
    `);

    let currentBrand = '';
    let ok = 0, missingInAssetMap = [], missingThumbnail = [], slugMismatch = [];

    for (const model of models.rows) {
        if (model.brand_name !== currentBrand) {
            currentBrand = model.brand_name;
            console.log(`\n🏷️  ${currentBrand.toUpperCase()} (brand_slug: ${model.brand_slug})`);
        }

        const brandAssets = assetMap[model.brand_slug];
        const modelAssets = brandAssets?.models?.[model.slug];

        const hasImage = modelAssets?.image;
        const hasGallery = modelAssets?.gallery?.length > 0;
        const hasBanner = modelAssets?.desktopBanner;

        if (!brandAssets) {
            // Marca no existe en assetMap
            console.log(`  ❌ MARCA FALTANTE en assetMap: ${model.brand_slug}`);
            missingInAssetMap.push({ brand: model.brand_slug, model: model.slug, issue: 'Marca no en assetMap' });
            continue;
        }

        if (!modelAssets) {
            console.log(`  ⚠️  ${model.name} (slug: "${model.slug}") → NO ESTÁ en assetMap`);
            missingInAssetMap.push({ brand: model.brand_slug, model: model.slug, name: model.name, issue: 'Modelo no en assetMap' });
        } else {
            const imageIcon = hasImage ? '🖼️ ' : '❌';
            const galleryIcon = hasGallery ? `📸(${modelAssets.gallery.length})` : '❌ galería';
            const bannerIcon = hasBanner ? '🖥️ ' : '⚪ sin banner';
            console.log(`  ✅ ${model.name} → ${imageIcon} thumb | ${galleryIcon} | ${bannerIcon}`);

            if (!hasImage) {
                missingThumbnail.push({ brand: model.brand_slug, model: model.slug, name: model.name });
            }
            ok++;
        }
    }

    // ── RESUMEN ──────────────────────────────────────────────────────────
    console.log(`\n${'='.repeat(72)}`);
    console.log(`\n📊 RESUMEN DE IMÁGENES\n`);
    console.log(`   ✅ Modelos con imagen correcta:         ${ok}`);
    console.log(`   ❌ Modelos NO encontrados en assetMap:  ${missingInAssetMap.length}`);
    console.log(`   ⚠️  Modelos sin thumbnail:              ${missingThumbnail.length}`);

    if (missingInAssetMap.length > 0) {
        console.log(`\n❌ MODELOS FALTANTES EN assetMap.json (sin imagen):\n`);
        missingInAssetMap.forEach(m => {
            console.log(`   [${m.brand}] ${m.model} → ${m.issue}`);
            console.log(`   Ruta esperada en R2: autos-nuevos/${m.brand}/modelos/${m.model}/thumb.webp`);
        });
    }

    if (missingThumbnail.length > 0) {
        console.log(`\n⚠️  MODELOS SIN THUMBNAIL en assetMap:\n`);
        missingThumbnail.forEach(m => {
            console.log(`   [${m.brand}] ${m.model} (${m.name})`);
        });
    }

    // ── Verificar marcas en assetMap que NO están en Neon ──
    console.log(`\n${'─'.repeat(72)}`);
    console.log(`\n🔍 Marcas en assetMap.json pero NO en Neon DB:\n`);
    const neonBrandSlugs = [...new Set(models.rows.map(m => m.brand_slug))];
    const assetMapBrands = Object.keys(assetMap);
    const extraInAssetMap = assetMapBrands.filter(b => !neonBrandSlugs.includes(b));
    if (extraInAssetMap.length) {
        extraInAssetMap.forEach(b => console.log(`   ⚪ ${b} (solo en assetMap, no en Neon)`));
    } else {
        console.log('   Ninguna — todo sincronizado.');
    }

    console.log(`\n${'='.repeat(72)}\n`);
    await client.end();
}

run().catch(err => { console.error('❌ Error:', err.message); process.exit(1); });
