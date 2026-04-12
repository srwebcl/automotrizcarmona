const { Client } = require('./db-migration/node_modules/pg');
const DB_URL = 'postgresql://neondb_owner:npg_3pIdfLMDo0qH@ep-rough-pine-acw7ii9a-pooler.sa-east-1.aws.neon.tech/carmonaycia?sslmode=verify-full';
async function run() {
    const client = new Client({ connectionString: DB_URL });
    await client.connect();
    console.log('Connected.');

    // Create pivot table branch_truck_brand
    await client.query(`
        CREATE TABLE IF NOT EXISTS branch_truck_brand (
            id BIGSERIAL PRIMARY KEY,
            branch_id BIGINT NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
            truck_brand_id BIGINT NOT NULL REFERENCES truck_brands(id) ON DELETE CASCADE,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        )
    `);
    console.log('Created branch_truck_brand pivot table.');
    await client.end();
}
run().catch(e => console.error('Error:', e.message));
