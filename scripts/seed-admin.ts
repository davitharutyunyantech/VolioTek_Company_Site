import { hashPassword } from '../src/lib/server/auth';
import { getPrisma } from '../src/lib/server/prisma';

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const prisma = getPrisma();

  if (!email || !password) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required.');
  }

  if (!prisma) {
    throw new Error('DATABASE_URL is required to seed admin user.');
  }

  await prisma.adminUser.upsert({
    where: { email },
    create: {
      email,
      passwordHash: hashPassword(password),
    },
    update: {
      passwordHash: hashPassword(password),
    },
  });

  console.log(`Admin user seeded: ${email}`);
}

main()
  .finally(async () => {
    await getPrisma()?.$disconnect();
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
