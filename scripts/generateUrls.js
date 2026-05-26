const fs = require('fs');
const path = require('path');

const API_BASE = 'https://api.automotrizcarmona.cl/api/v1';
const SITE_BASE = 'https://automotrizcarmona.cl';

const STATIC_ROUTES = [
    '/',
    '/sucursales',
    '/contacto',
    '/cotizar',
    '/dyp',
    '/electromovilidad',
    '/legal',
    '/liquidacion',
    '/noticias',
    '/nuevos',
    '/repuestos',
    '/repuestos/cotizar',
    '/servicios',
    '/servicios/agendar',
    '/reclamos',
    '/camiones'
];

async function fetchJson(url) {
    try {
        const res = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (URL Generator)'
            }
        });
        if (!res.ok) {
            console.warn(`[WARN] FAILED to fetch ${url}. Status: ${res.status}`);
            return null;
        }
        return await res.json();
    } catch (e) {
        console.error(`[ERROR] Fetching ${url}:`, e.message);
        return null;
    }
}

async function main() {
    console.log('Starting URL list and Sitemap generation...');

    const urls = new Set();
    
    // Add static routes
    STATIC_ROUTES.forEach(route => {
        urls.add(`${SITE_BASE}${route}`);
    });

    // 1. Fetch Passenger/SUV Brands and Models
    console.log('Fetching passenger brands...');
    const brandsRes = await fetchJson(`${API_BASE}/brands`);
    if (brandsRes) {
        const brands = Array.isArray(brandsRes) ? brandsRes : (brandsRes.data || []);
        console.log(`Found ${brands.length} passenger brands. Fetching models...`);
        
        for (const brand of brands) {
            if (!brand.slug) continue;
            
            // Add brand landing page
            urls.add(`${SITE_BASE}/nuevos/${brand.slug}`);
            
            // Fetch models for brand
            const modelsRes = await fetchJson(`${API_BASE}/models/${brand.slug}`);
            if (modelsRes) {
                const models = Array.isArray(modelsRes) ? modelsRes : (modelsRes.data || []);
                console.log(`  - Brand ${brand.slug}: ${models.length} models`);
                for (const model of models) {
                    const modelSlug = model.slug || model.id;
                    if (modelSlug) {
                        urls.add(`${SITE_BASE}/nuevos/${brand.slug}/${modelSlug}`);
                    }
                }
            }
        }
    }

    // Hardcode specific pages like toyota yaris-cross just in case
    urls.add(`${SITE_BASE}/nuevos/toyota/yaris-cross`);

    // 2. Fetch Truck Brands and Trucks
    console.log('Fetching truck brands...');
    const truckBrandsRes = await fetchJson(`${API_BASE}/truck-brands`);
    if (truckBrandsRes) {
        const truckBrands = Array.isArray(truckBrandsRes) ? truckBrandsRes : (truckBrandsRes.data || []);
        console.log(`Found ${truckBrands.length} truck brands. Fetching trucks...`);
        
        for (const brand of truckBrands) {
            if (!brand.slug) continue;
            
            // Add truck brand landing page
            urls.add(`${SITE_BASE}/camiones/${brand.slug}`);
            
            // Fetch trucks for brand
            const trucksRes = await fetchJson(`${API_BASE}/truck-brands/${brand.slug}/trucks`);
            if (trucksRes) {
                const trucksData = trucksRes.trucks || [];
                console.log(`  - Truck Brand ${brand.slug}: ${trucksData.length} trucks`);
                for (const truck of trucksData) {
                    if (truck.slug) {
                        // Truck models pages (even if they are preparation placeholders, they exist in routing)
                        urls.add(`${SITE_BASE}/camiones/${brand.slug}/${truck.slug}`);
                    }
                }
            }
        }
    }

    // 3. Fetch News
    console.log('Fetching news...');
    const newsRes = await fetchJson(`${API_BASE}/news`);
    if (newsRes) {
        const news = Array.isArray(newsRes) ? newsRes : (newsRes.data || newsRes || []);
        console.log(`Found ${news.length} news articles.`);
        for (const article of news) {
            if (article.slug) {
                urls.add(`${SITE_BASE}/noticias/${article.slug}`);
            }
        }
    }

    // Convert Set to sorted Array
    const sortedUrls = Array.from(urls).sort();
    
    // Save public/urls.txt
    const txtContent = sortedUrls.join('\n') + '\n';
    const txtPath = path.join(__dirname, '..', 'public', 'urls.txt');
    
    // Make sure public directory exists
    const publicDir = path.join(__dirname, '..', 'public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    fs.writeFileSync(txtPath, txtContent, 'utf-8');
    console.log(`Generated urls.txt with ${sortedUrls.length} URLs at: ${txtPath}`);

    // Generate XML Sitemap
    const today = new Date().toISOString().split('T')[0];
    let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    sortedUrls.forEach(url => {
        // High priority for homepage, medium for category lists, lower for details
        let priority = '0.6';
        let changefreq = 'weekly';
        
        const pathname = url.replace(SITE_BASE, '');
        if (pathname === '/' || pathname === '') {
            priority = '1.0';
            changefreq = 'daily';
        } else if (
            pathname === '/nuevos' || 
            pathname === '/camiones' || 
            pathname === '/sucursales' ||
            pathname === '/contacto' ||
            pathname === '/cotizar'
        ) {
            priority = '0.8';
            changefreq = 'daily';
        } else if (
            pathname.startsWith('/nuevos/') && pathname.split('/').length === 3 // /nuevos/[brand]
        ) {
            priority = '0.7';
            changefreq = 'weekly';
        } else if (
            pathname.startsWith('/camiones/') && pathname.split('/').length === 3 // /camiones/[brand]
        ) {
            priority = '0.7';
            changefreq = 'weekly';
        } else if (pathname.startsWith('/noticias/')) {
            priority = '0.5';
            changefreq = 'monthly';
        }

        xmlContent += `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>\n`;
    });

    xmlContent += `</urlset>\n`;
    
    const xmlPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
    fs.writeFileSync(xmlPath, xmlContent, 'utf-8');
    console.log(`Generated sitemap.xml with ${sortedUrls.length} entries at: ${xmlPath}`);
}

main().catch(err => {
    console.error('Fatal error running generator:', err);
    process.exit(1);
});
