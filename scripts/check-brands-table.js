const { Client } = require('./db-migration/node_modules/pg');
const DB_URL = 'postgresql://neondb_owner:npg_3pIdfLMDo0qH@ep-rough-pine-acw7ii9a-pooler.sa-east-1.aws.neon.tech/carmonaycia?sslmode=verify-full';
async function run() {
    const client = new Client({ connectionString: DB_URL });
    await client.connect();
    const r1 = await client.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'brands' ORDER BY ordinal_position`);
    console.log('\n=== brands columns ===');
    r1.rows.forEach(r => console.log(` ${r.column_name} (${r.data_type})`));
    const r2 = await client.query(`SELECT id, name, is_active FROM brands LIMIT 5`);
    console.log('\n=== sample brands ===');
    console.log(JSON.stringify(r2.rows, null, 2));
    await client.end();
}
run().catch(e => console.error('Error:', e.message));
