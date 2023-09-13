import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { createClient } from '@libsql/client';
import * as dotenv from 'dotenv';
dotenv.config();


async function run() {
  const dbUrl = process.env.DB_URL;
  const dbAuthToken = process.env.DB_AUTH_TOKEN;

  if (!dbUrl || !dbAuthToken) {
    throw new Error("DB_URL and DB_AUTH_TOKEN must be set in .env");
  }

  const db = drizzle(createClient({ url: dbUrl, authToken: dbAuthToken }));

  console.log('Starting migration...');

  await migrate(db, { migrationsFolder: 'drizzle' });

  console.log('Migration complete!');

  process.exit(0);
}

run().catch((err) => {
  console.error('Migration failed!');
  console.error(err);
  process.exit(1);
});
