const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, 'carmona-assets', 'autos-nuevos');
const assetMap = {};

if (!fs.existsSync(basePath)) {
    console.error("No carmona-assets directory found!");
    process.exit(1);
}

const cdnBase = 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/autos-nuevos';

const brands = fs.readdirSync(basePath).filter(d => fs.statSync(path.join(basePath, d)).isDirectory());

for (const brand of brands) {
    assetMap[brand] = {
        brandBanners: [],
        serviceImages: {},
        models: {}
    };

    const brandPath = path.join(basePath, brand);

    // Brand level banners
    const brandBannerPath = path.join(brandPath, 'banner');
    if (fs.existsSync(brandBannerPath)) {
        const brandBannerFiles = fs.readdirSync(brandBannerPath).filter(f => f.match(/\.(webp|jpg|jpeg|png)$/i));
        
        // Try to pair web/movil banners
        const webBanners = brandBannerFiles.filter(f => f.match(/[-_]web\./i) || f.match(/[-_]desktop\./i));
        const mobileBanners = brandBannerFiles.filter(f => f.match(/[-_]movil\./i) || f.match(/[-_]mobile\./i));
        
        if (webBanners.length > 0) {
            assetMap[brand].brandBanners = webBanners.map((f, i) => ({
                web: `${cdnBase}/${brand}/banner/${f}`,
                mobile: mobileBanners[i] ? `${cdnBase}/${brand}/banner/${mobileBanners[i]}` : `${cdnBase}/${brand}/banner/${f}`
            }));
        } else {
            // Fallback to simple list if no clear naming convention
            assetMap[brand].brandBanners = brandBannerFiles.map(f => ({
                web: `${cdnBase}/${brand}/banner/${f}`,
                mobile: `${cdnBase}/${brand}/banner/${f}`
            }));
        }
    }

    // Mas Info / Service images
    const masInfoPath = path.join(brandPath, 'mas-info');
    if (fs.existsSync(masInfoPath)) {
        const masInfoFiles = fs.readdirSync(masInfoPath).filter(f => f.match(/\.(webp|jpg|jpeg|png)$/i));
        assetMap[brand].serviceImages = {
            servicio: masInfoFiles.find(f => f.toLowerCase().includes('serv')) ? `${cdnBase}/${brand}/mas-info/${masInfoFiles.find(f => f.toLowerCase().includes('serv'))}` : null,
            repuestos: masInfoFiles.find(f => f.toLowerCase().includes('repuest')) ? `${cdnBase}/${brand}/mas-info/${masInfoFiles.find(f => f.toLowerCase().includes('repuest'))}` : null,
            usados: masInfoFiles.find(f => f.toLowerCase().includes('usado') || f.toLowerCase().includes('semi')) ? `${cdnBase}/${brand}/mas-info/${masInfoFiles.find(f => f.toLowerCase().includes('usado') || f.toLowerCase().includes('semi'))}` : null,
            sucursales: masInfoFiles.find(f => f.toLowerCase().includes('sucur')) ? `${cdnBase}/${brand}/mas-info/${masInfoFiles.find(f => f.toLowerCase().includes('sucur'))}` : null
        };
    }

    const modelosPath = path.join(brandPath, 'modelos');
    
    if (fs.existsSync(modelosPath)) {
        const models = fs.readdirSync(modelosPath).filter(d => fs.statSync(path.join(modelosPath, d)).isDirectory());
        
        for (const model of models) {
            const modelPath = path.join(modelosPath, model);
            // Normalize model name to match API slug: lowercase and keep hyphens
            let modelSlug = model.toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[\s_]+/g, '-')
                .replace(/[^\w-]/g, '');

            // Manual mapping for specific cases where folder name doesn't match API slug
            if (modelSlug === 'id-4') modelSlug = 'id4';

            const modelData = {
                image: '',
                desktopBanner: '',
                mobileBanner: '',
                gallery: [],
                features: []
            };
            
            // Thumbnail: look for any .webp first ideally, then .png, .jpg in root of model
            const files = fs.readdirSync(modelPath).filter(f => fs.statSync(path.join(modelPath, f)).isFile());
            const imageFile = files.find(f => f.match(/\.webp$/i)) || files.find(f => f.match(/\.(jpg|jpeg|png)$/i));
            if (imageFile) {
                modelData.image = `${cdnBase}/${brand}/modelos/${model}/${imageFile}`;
            }

            // Banner
            const bannerPath = path.join(modelPath, 'banner');
            if (fs.existsSync(bannerPath)) {
                const bannerFiles = fs.readdirSync(bannerPath).filter(f => f.match(/\.(webp|jpg|jpeg|png)$/i));
                
                // Precise detection using regex for suffixes or standalone words
                const webFile = bannerFiles.find(f => f.match(/[-_]web\./i) || f.match(/[-_]desktop\./i));
                const mobileFile = bannerFiles.find(f => f.match(/[-_]movil\./i) || f.match(/[-_]mobile\./i));

                if (webFile) {
                    modelData.desktopBanner = `${cdnBase}/${brand}/modelos/${model}/banner/${webFile}`;
                    modelData.mobileBanner = mobileFile 
                        ? `${cdnBase}/${brand}/modelos/${model}/banner/${mobileFile}`
                        : `${cdnBase}/${brand}/modelos/${model}/banner/${webFile}`;
                } else if (bannerFiles.length > 0) {
                    // Search again with less strict includes if regex fails
                    const fallbackWeb = bannerFiles.find(f => f.toLowerCase().includes('web') || f.toLowerCase().includes('desktop'));
                    const fallbackMobile = bannerFiles.find(f => f.toLowerCase().includes('movil') || f.toLowerCase().includes('mobile'));
                    
                    modelData.desktopBanner = `${cdnBase}/${brand}/modelos/${model}/banner/${fallbackWeb || bannerFiles[0]}`;
                    modelData.mobileBanner = `${cdnBase}/${brand}/modelos/${model}/banner/${fallbackMobile || (bannerFiles.length > 1 ? bannerFiles[1] : bannerFiles[0])}`;
                }
            }

            // Gallery
            const galeriaPath = path.join(modelPath, 'galeria');
            if (fs.existsSync(galeriaPath)) {
                const galeriaFiles = fs.readdirSync(galeriaPath).filter(f => f.match(/\.(webp|jpg|jpeg|png)$/i));
                modelData.gallery = galeriaFiles.map(f => `${cdnBase}/${brand}/modelos/${model}/galeria/${f}`);
            }

            // Caracteristicas
            const featuresPath = path.join(modelPath, 'caracteristicas');
            if (fs.existsSync(featuresPath)) {
                const featuresFiles = fs.readdirSync(featuresPath).filter(f => f.match(/\.(webp|jpg|jpeg|png)$/i));
                modelData.features = featuresFiles.map(f => `${cdnBase}/${brand}/modelos/${model}/caracteristicas/${f}`);
            }

            assetMap[brand].models[modelSlug] = modelData;
        }
    }
}

fs.writeFileSync(path.join(__dirname, 'lib', 'assetMap.json'), JSON.stringify(assetMap, null, 2));
console.log("Asset map generated successfully at lib/assetMap.json!");
