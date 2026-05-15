import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated/prisma/client';

process.loadEnvFile?.('.env');

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export function getPrisma() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    return null;
  }

  globalForPrisma.prisma ??= new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });
  return globalForPrisma.prisma;
}
