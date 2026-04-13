require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

async function main() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });
    
    await client.connect();
    
    const count = await client.query("SELECT count(*) FROM form_recipients WHERE identifier = 'promociones'");
    if (count.rows[0].count === '0') {
        await client.query("INSERT INTO form_recipients (identifier, name, emails, created_at, updated_at) VALUES ('promociones', 'Banner Promocional Home', '[\"marketing@carmonaycia.cl\"]', NOW(), NOW())");
        console.log("Inserted 'promociones' successfully.");
    } else {
        console.log("'promociones' already exists.");
    }
    
    await client.end();
}
main();
