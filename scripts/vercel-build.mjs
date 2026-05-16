import { spawnSync } from 'node:child_process';

function run(command, args) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

const isVercelProduction = process.env.VERCEL === '1' && process.env.VERCEL_ENV === 'production';

if (isVercelProduction) {
  run('npm', ['run', 'prisma:deploy']);
} else {
  console.log('Skipping production database migrations for this build.');
}

run('npm', ['run', 'build']);
