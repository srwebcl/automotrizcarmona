const fs = require('fs');

try {
    const rawData = fs.readFileSync('lighthouse-desktop.json', 'utf8');
    const data = JSON.parse(rawData);

    const score = data.categories.performance.score * 100;
    console.log(`\n=== Lighthouse Desktop Puntuación: ${score}/100 ===`);

    const metrics = data.audits;
    
    console.log("\nMétricas Principales:");
    console.log(`- LCP (Largest Contentful Paint): ${metrics['largest-contentful-paint'].displayValue}`);
    console.log(`- FCP (First Contentful Paint): ${metrics['first-contentful-paint'].displayValue}`);
    console.log(`- TBT (Total Blocking Time): ${metrics['total-blocking-time'].displayValue}`);
    console.log(`- CLS (Cumulative Layout Shift): ${metrics['cumulative-layout-shift'].displayValue}`);
    console.log(`- SI (Speed Index): ${metrics['speed-index'].displayValue}`);

    if (metrics['largest-contentful-paint-element'] && metrics['largest-contentful-paint-element'].details) {
        const lcpElement = metrics['largest-contentful-paint-element'].details.items[0];
        console.log("\nElemento causante del LCP:");
        console.log(lcpElement ? lcpElement.node.snippet : "N/A");
    }

    if (metrics['long-tasks'] && metrics['long-tasks'].details) {
        console.log("\nTareas Largas (Bloqueos del Hilo):");
        const items = metrics['long-tasks'].details.items || [];
        items.slice(0, 5).forEach(task => {
            console.log(`- URL: ${task.url || 'Desconocido'}, Duración: ${task.duration}ms`);
        });
    }

} catch (e) {
    console.error("Error al procesar el archivo JSON de Lighthouse:", e);
}
