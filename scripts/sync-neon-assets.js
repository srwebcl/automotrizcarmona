/**
 * sync-neon-assets.js
 * 
 * Este script sincroniza Neon DB con los datos de lib/assetMap.json:
 * 1. Inserta hero_banners en brands.
 * 2. Actualiza thumbnail_url, desktop_banner_url, mobile_banner_url, gallery en vehicle_models.
 * 3. Inserta registros en features enlazados al modelo.
 * 
 * Uso: node scripts/sync-neon-assets.js
 */

const { Client } = require('./db-migration/node_modules/pg');
const assetMap = require('../lib/assetMap.json');

const DB_URL = 'postgresql://neondb_owner:npg_3pIdfLMDo0qH@ep-rough-pine-acw7ii9a-pooler.sa-east-1.aws.neon.tech/carmonaycia?sslmode=verify-full';

function toSlug(str) {
    if (!str) return '';
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

function cleanUrl(url) {
    if (!url) return null;
    return url.replace('https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/', '');
}

async function run() {
    const client = new Client({ connectionString: DB_URL });
    await client.connect();
    console.log('✅ Conectado a Neon DB para sincronización de Assets\n');

    // === PASO 1: Sincronizar Marcas (Brands) ===
    console.log('🔄 PASO 1: Sincronizando hero_banners de marcas...\n');
    const brands = await client.query(`SELECT id, slug, hero_banners FROM brands`);
    let brandsActualizadas = 0;

    for (const row of brands.rows) {
        const brandData = assetMap[row.slug];
        if (!brandData) continue;
        
        if (brandData.brandBanners && brandData.brandBanners.length > 0) {
            const newBanners = brandData.brandBanners.map((b, idx) => ({
                title: 'Banner ' + (idx + 1),
                desktop_image: cleanUrl(b.web),
                mobile_image: cleanUrl(b.mobile) || cleanUrl(b.web)
            }));
            
            await client.query(
                'UPDATE brands SET hero_banners = $1, updated_at = NOW() WHERE id = $2',
                [JSON.stringify(newBanners), row.id]
            );
            brandsActualizadas++;
            process.stdout.write(`  ✓ [${row.slug}] Banners actualizados\n`);
        }
    }

    // === PASO 2: Sincronizar Modelos (Vehicle Models) ===
    console.log('\n🔄 PASO 2: Sincronizando assets de modelos...\n');
    const modelos = await client.query(`
        SELECT vm.id, vm.name, vm.slug, b.slug as brand_slug, vm.thumbnail_url, vm.gallery
        FROM vehicle_models vm
        JOIN brands b ON vm.brand_id = b.id
    `);
    
    let modelosActualizados = 0;
    let featuresInsertadas = 0;

    for (const row of modelos.rows) {
        const brandData = assetMap[row.brand_slug];
        if (!brandData || !brandData.models) continue;

        let modelData = brandData.models[row.slug];
        if (!modelData) {
            // Intentar por coincidencia aproximada
            const modelKeys = Object.keys(brandData.models);
            const matchKey = modelKeys.find(k => 
                toSlug(k) === row.slug || 
                row.slug?.includes(toSlug(k)) || 
                toSlug(k)?.includes(row.slug)
            );
            if (matchKey) modelData = brandData.models[matchKey];
        }

        if (!modelData) continue;

        const updateFields = [];
        const updateValues = [];
        let pidx = 1;

        // Limpiar URL base del CDN para guardar la ruta relativa si se desea
        const finalThumb = cleanUrl(modelData.image) || row.thumbnail_url;
        const finalDesk = cleanUrl(modelData.desktopBanner);
        const finalMob = cleanUrl(modelData.mobileBanner);
        const finalGallery = modelData.gallery ? modelData.gallery.map(cleanUrl) : row.gallery;
        
        let shouldUpdateModel = false;

        // Inyectamos todo siempre y cuando haya datos en assetMap
        if (finalThumb) {
            updateFields.push(`thumbnail_url = $${pidx++}`);
            updateValues.push(finalThumb);
            shouldUpdateModel = true;
        }

        if (finalDesk) {
            updateFields.push(`desktop_banner_url = $${pidx++}`);
            updateValues.push(finalDesk);
            shouldUpdateModel = true;
        }

        if (finalMob) {
            updateFields.push(`mobile_banner_url = $${pidx++}`);
            updateValues.push(finalMob);
            shouldUpdateModel = true;
        }

        if (finalGallery && finalGallery.length > 0) {
            updateFields.push(`gallery = $${pidx++}`);
            updateValues.push(JSON.stringify(finalGallery));
            shouldUpdateModel = true;
        }

        if (shouldUpdateModel) {
            updateValues.push(row.id);
            const queryModel = `UPDATE vehicle_models SET ${updateFields.join(', ')}, updated_at = NOW() WHERE id = $${pidx}`;
            await client.query(queryModel, updateValues);
            modelosActualizados++;
            process.stdout.write(`  ✓ [${row.brand_slug}/${row.slug}] Assets actualizados\n`);
        }

        // === PASO 3: Sincronizar Features ===
        if (modelData.features && modelData.features.length > 0) {
            // Revisar si el modelo ya tiene features
            const checkF = await client.query(`SELECT id FROM features WHERE vehicle_model_id = $1 LIMIT 1`, [row.id]);
            if (checkF.rows.length === 0) {
                // Insertar!
                for (let i = 0; i < modelData.features.length; i++) {
                    const featureUrl = cleanUrl(modelData.features[i]);
                    await client.query(
                        `INSERT INTO features (vehicle_model_id, title, description, image_url, created_at, updated_at)
                         VALUES ($1, $2, $3, $4, NOW(), NOW())`,
                         [row.id, `Elemento Destacado ${i+1}`, '', featureUrl]
                    );
                    featuresInsertadas++;
                }
            }
        }
    }

    console.log(`\n\n📊 ===  REPORTE FINAL  ===`);
    console.log(`✅ Marcas actualizadas con baners: ${brandsActualizadas}`);
    console.log(`✅ Modelos actualizados: ${modelosActualizados}`);
    console.log(`✅ Features insertadas: ${featuresInsertadas}`);

    await client.end();
    console.log('\n🎉 ¡Sincronización completada!');
}

run().catch(err => {
    console.error('\n❌ Error fatal:', err.message);
    process.exit(1);
});
