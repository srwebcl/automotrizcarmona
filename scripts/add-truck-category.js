const { Client } = require('./db-migration/node_modules/pg');
const DB_URL = 'postgresql://neondb_owner:npg_3pIdfLMDo0qH@ep-rough-pine-acw7ii9a-pooler.sa-east-1.aws.neon.tech/carmonaycia?sslmode=verify-full';

async function run() {
    const client = new Client({ connectionString: DB_URL });
    await client.connect();
    console.log('Connected to DB');

    try {
        await client.query(`ALTER TABLE trucks ADD COLUMN IF NOT EXISTS category VARCHAR(255) NULL`);
        console.log('Successfully added category column to trucks table.');
    } catch (e) {
        console.error('Migration error:', e.message);
    } finally {
        await client.end();
    }
}
run();
