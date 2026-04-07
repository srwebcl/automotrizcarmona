const { Client } = require('./db-migration/node_modules/pg');
const DB_URL = 'postgresql://neondb_owner:npg_3pIdfLMDo0qH@ep-rough-pine-acw7ii9a-pooler.sa-east-1.aws.neon.tech/carmonaycia?sslmode=verify-full';

async function run() {
    const client = new Client({ connectionString: DB_URL });
    await client.connect();

    // Ver estructura real de vehicle_versions
    const r1 = await client.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'vehicle_versions' ORDER BY ordinal_position`);
    console.log('\n=== vehicle_versions columns ===');
    r1.rows.forEach(r => console.log(` ${r.column_name} (${r.data_type})`));

    // Ver estructura real de vehicle_models
    const r2 = await client.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'vehicle_models' ORDER BY ordinal_position`);
    console.log('\n=== vehicle_models columns ===');
    r2.rows.forEach(r => console.log(` ${r.column_name} (${r.data_type})`));

    // Ver muestra de vehicle_versions
    const r3 = await client.query(`SELECT * FROM vehicle_versions LIMIT 2`);
    console.log('\n=== Sample vehicle_versions ===');
    console.log(JSON.stringify(r3.rows, null, 2));

    await client.end();
}
run().catch(e => console.error('Error:', e.message));
