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

const branch = process.env.VERCEL_GIT_COMMIT_REF;
const shouldRunMigrations = process.env.VERCEL === '1' && (branch === 'dev' || branch === 'main');

if (shouldRunMigrations) {
  console.log(`Running database migrations for branch: ${branch}`);
  run('npm', ['run', 'prisma:generate']);
  run('npm', ['run', 'prisma:deploy']);
} else {
  console.log(`Skipping database migrations for branch: ${branch ?? 'unknown'}`);
}

run('npm', ['run', 'build']);
