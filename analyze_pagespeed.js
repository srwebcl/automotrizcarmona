const url = "https://www.automotrizcarmona.cl/";

async function analyze(strategy) {
    console.log(`\n=== Evaluando rendimiento en ${strategy.toUpperCase()} ===`);
    try {
        const response = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&category=performance`);
        const data = await response.json();
        
        if (data.error) {
            console.error("Error de la API:", data.error.message);
            return;
        }

        const lighthouse = data.lighthouseResult;
        const score = lighthouse.categories.performance.score * 100;
        
        console.log(`Puntaje de Rendimiento: ${score}/100`);
        
        const metrics = lighthouse.audits;
        
        console.log("Métricas Principales:");
        console.log(`- LCP (Largest Contentful Paint): ${metrics['largest-contentful-paint'].displayValue}`);
        console.log(`- FCP (First Contentful Paint): ${metrics['first-contentful-paint'].displayValue}`);
        console.log(`- TBT (Total Blocking Time): ${metrics['total-blocking-time'].displayValue}`);
        console.log(`- CLS (Cumulative Layout Shift): ${metrics['cumulative-layout-shift'].displayValue}`);
        console.log(`- SI (Speed Index): ${metrics['speed-index'].displayValue}`);
        
        // Culpable del LCP
        if (metrics['largest-contentful-paint-element'] && metrics['largest-contentful-paint-element'].details) {
            const lcpElement = metrics['largest-contentful-paint-element'].details.items[0];
            console.log("\nElemento causante del LCP (Retraso mayor):");
            console.log(lcpElement.node ? lcpElement.node.snippet : "N/A");
        }

        // Tareas largas / Bloqueo del hilo
        if (metrics['long-tasks'] && metrics['long-tasks'].details) {
            console.log("\nTareas largas que bloquean el procesador:");
            const items = metrics['long-tasks'].details.items || [];
            items.slice(0, 3).forEach(task => {
                console.log(`- ${task.url || 'Script desconocido'}: ${task.duration}ms`);
            });
        }
        
    } catch (e) {
        console.error("Fallo al conectar con Google PageSpeed API:", e);
    }
}

async function runAll() {
    console.log("Iniciando escaneo forense de PageSpeed a Automotriz Carmona...");
    await analyze("mobile");
    await analyze("desktop");
    console.log("\nEscaneo completado.");
}

runAll();
