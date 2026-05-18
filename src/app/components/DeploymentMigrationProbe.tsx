import { getPrisma } from '@/lib/server/prisma';

type ProbeRow = {
  label: string;
  createdAt: Date;
};

async function getDeploymentMigrationProbe() {
  const prisma = getPrisma();

  if (!prisma) {
    return null;
  }

  try {
    const rows = await prisma.$queryRaw<ProbeRow[]>`
      SELECT "label", "createdAt"
      FROM "DeploymentMigrationProbe"
      WHERE "id" = 'vercel-branch-migration-probe'
      LIMIT 1
    `;

    return rows[0] ?? null;
  } catch {
    return null;
  }
}

export async function DeploymentMigrationProbe() {
  const probe = await getDeploymentMigrationProbe();

  if (!probe) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-[80] rounded-lg border border-[#18D6BD]/40 bg-[#071625]/95 px-4 py-3 text-sm text-[#F0FFFD] shadow-xl shadow-[#071625]/30 backdrop-blur">
      <div className="font-semibold text-[#18D6BD]">Migration probe active</div>
      <div className="mt-1 text-xs text-[#F0FFFD]/70">{probe.label}</div>
    </div>
  );
}
