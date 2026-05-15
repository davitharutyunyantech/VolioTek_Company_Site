import process from 'node:process';
import { defineConfig, env } from 'prisma/config';

try {
  process.loadEnvFile?.('.env');
} catch {
  // Vercel and CI provide environment variables directly without a local .env file.
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});
