const { Client } = require('./db-migration/node_modules/pg');
const DB_URL = 'postgresql://neondb_owner:npg_3pIdfLMDo0qH@ep-rough-pine-acw7ii9a-pooler.sa-east-1.aws.neon.tech/carmonaycia?sslmode=verify-full';

async function run() {
    const client = new Client({ connectionString: DB_URL });
    try {
        await client.connect();
        
        const updates = [
            { name: 'Nuevo A5', slug: 'nuevo-a5' },
            { name: 'Nuevo Q3', slug: 'nuevo-q3' },
            { name: 'Nuevo Q3 Sportback', slug: 'nuevo-q3-sportback' },
            { name: 'Nuevo Q5', slug: 'nuevo-q5' },
            { name: 'Nuevo Q5 Sportback', slug: 'nuevo-q5-sportback' },
            { name: 'Nuevo S5', slug: 'nuevo-s5' },
            { name: 'Nuevo Sq5', slug: 'nuevo-sq5' },
            { name: 'Nuevo Tera', slug: 'nuevo-tera' },
            { name: 'Nuevo Tiguan', slug: 'nuevo-tiguan' }
        ];

        for (const item of updates) {
            await client.query('UPDATE vehicle_models SET slug = $1 WHERE name = $2', [item.slug, item.name]);
        }
        
        await client.query('UPDATE vehicle_models SET is_active = false WHERE slug = $1', ['gx3-pro']);
        
        console.log('✅ Sincronización de slugs completada.');
    } catch (e) {
        console.error('❌ Error:', e.message);
    } finally {
        await client.end();
    }
}
run();
