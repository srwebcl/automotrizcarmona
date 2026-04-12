const { Client } = require('./db-migration/node_modules/pg');
const DB_URL = 'postgresql://neondb_owner:npg_3pIdfLMDo0qH@ep-rough-pine-acw7ii9a-pooler.sa-east-1.aws.neon.tech/carmonaycia?sslmode=verify-full';
async function run() {
    const client = new Client({ connectionString: DB_URL });
    await client.connect();
    await client.query(`ALTER TABLE branches ADD COLUMN IF NOT EXISTS brands_list TEXT NULL`);
    console.log('Added brands_list column to branches.');
    await client.end();
}
run().catch(e => console.error('Error:', e.message));
