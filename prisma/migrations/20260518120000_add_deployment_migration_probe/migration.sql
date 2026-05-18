-- Temporary deployment probe used to verify branch-specific Vercel migrations.
CREATE TABLE "DeploymentMigrationProbe" (
  "id" TEXT NOT NULL,
  "label" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "DeploymentMigrationProbe_pkey" PRIMARY KEY ("id")
);

INSERT INTO "DeploymentMigrationProbe" ("id", "label")
VALUES ('vercel-branch-migration-probe', 'Vercel branch migration applied');
