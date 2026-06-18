import { MetadataRoute } from 'next';
import { getBrands, getModelsByBrand, getTruckBrands, getTrucksByBrand, getNews } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.automotrizcarmona.cl';
  const lastModified = new Date();

  // Rutas estáticas principales
  const routes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/nuevos`, lastModified, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/camiones`, lastModified, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/sucursales`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contacto`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/servicios`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/repuestos`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/cotizar`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/noticias`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/legal`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
  ];

  try {
    // 1. Marcas y Autos Nuevos
    const brands = await getBrands();
    for (const brand of brands) {
        if (!brand.slug) continue;
        routes.push({
            url: `${baseUrl}/nuevos/${brand.slug}`,
            lastModified,
            changeFrequency: 'daily',
            priority: 0.8,
        });

        // Autos de cada marca
        const models = await getModelsByBrand(brand.slug);
        for (const model of models) {
            routes.push({
                url: `${baseUrl}/nuevos/${brand.slug}/${model.id}`,
                lastModified,
                changeFrequency: 'weekly',
                priority: 0.7,
            });
        }
    }

    // 2. Camiones
    const truckBrands = await getTruckBrands();
    for (const tBrand of truckBrands) {
        if (!tBrand.slug) continue;
        routes.push({
            url: `${baseUrl}/camiones/${tBrand.slug}`,
            lastModified,
            changeFrequency: 'daily',
            priority: 0.8,
        });

        const data = await getTrucksByBrand(tBrand.slug);
        if (data && data.trucks) {
            for (const truck of data.trucks) {
                routes.push({
                    url: `${baseUrl}/camiones/${tBrand.slug}/${truck.slug}`,
                    lastModified,
                    changeFrequency: 'weekly',
                    priority: 0.7,
                });
            }
        }
    }

    // 3. Noticias
    const news = await getNews();
    for (const article of news) {
        if (!article.slug) continue;
        routes.push({
            url: `${baseUrl}/noticias/${article.slug}`,
            lastModified: article.published_at ? new Date(article.published_at) : lastModified,
            changeFrequency: 'monthly',
            priority: 0.6,
        });
    }

  } catch (error) {
    console.error("Sitemap generation error:", error);
  }

  return routes;
}
