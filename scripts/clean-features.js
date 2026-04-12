const { Client } = require('pg');
const DB_URL = 'postgresql://neondb_owner:npg_3pIdfLMDo0qH@ep-rough-pine-acw7ii9a-pooler.sa-east-1.aws.neon.tech/carmonaycia?sslmode=require';

async function perform() {
  const client = new Client({ connectionString: DB_URL });
  await client.connect();
  try {
    const res = await client.query(`
      UPDATE features
      SET title = NULL, description = NULL
      WHERE title LIKE 'Elemento Destacado%' OR title LIKE 'Característica%';
    `);
    console.log('Updated rows:', res.rowCount);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}
perform();
