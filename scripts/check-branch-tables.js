const { Client } = require('./db-migration/node_modules/pg');
const DB_URL = 'postgresql://neondb_owner:npg_3pIdfLMDo0qH@ep-rough-pine-acw7ii9a-pooler.sa-east-1.aws.neon.tech/carmonaycia?sslmode=verify-full';

async function run() {
    const client = new Client({ connectionString: DB_URL });
    await client.connect();

    // Check branches columns
    const r1 = await client.query(`SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'branches' ORDER BY ordinal_position`);
    console.log('\n=== branches columns ===');
    r1.rows.forEach(r => console.log(` ${r.column_name} (${r.data_type}) nullable:${r.is_nullable}`));

    // Check if brand_branch pivot exists
    const r2 = await client.query(`SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'brand_branch') as exists`);
    console.log('\n=== brand_branch pivot table exists? ===', r2.rows[0].exists);

    await client.end();
}
run().catch(e => console.error('Error:', e.message));
