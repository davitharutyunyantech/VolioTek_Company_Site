-- CreateEnum
CREATE TYPE "PageStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'UNPUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "AuditAction" AS ENUM ('LOGIN', 'LOGIN_FAILED', 'DRAFT_SAVE', 'PUBLISH', 'UNPUBLISH', 'ARCHIVE', 'VALIDATION_FAILED');

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SitePage" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" "PageStatus" NOT NULL DEFAULT 'DRAFT',
    "draftRevisionId" TEXT,
    "publishedRevisionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SitePage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageRevision" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "metadata" JSONB NOT NULL,
    "content" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT,

    CONSTRAINT "PageRevision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditEvent" (
    "id" TEXT NOT NULL,
    "action" "AuditAction" NOT NULL,
    "pageId" TEXT,
    "userId" TEXT,
    "detail" JSONB,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SitePage_slug_key" ON "SitePage"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "SitePage_draftRevisionId_key" ON "SitePage"("draftRevisionId");

-- CreateIndex
CREATE UNIQUE INDEX "SitePage_publishedRevisionId_key" ON "SitePage"("publishedRevisionId");

-- CreateIndex
CREATE INDEX "PageRevision_pageId_createdAt_idx" ON "PageRevision"("pageId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "PageRevision_pageId_version_key" ON "PageRevision"("pageId", "version");

-- CreateIndex
CREATE INDEX "AuditEvent_createdAt_idx" ON "AuditEvent"("createdAt");

-- CreateIndex
CREATE INDEX "AuditEvent_pageId_idx" ON "AuditEvent"("pageId");

-- CreateIndex
CREATE INDEX "AuditEvent_userId_idx" ON "AuditEvent"("userId");

-- AddForeignKey
ALTER TABLE "SitePage" ADD CONSTRAINT "SitePage_draftRevisionId_fkey" FOREIGN KEY ("draftRevisionId") REFERENCES "PageRevision"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SitePage" ADD CONSTRAINT "SitePage_publishedRevisionId_fkey" FOREIGN KEY ("publishedRevisionId") REFERENCES "PageRevision"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageRevision" ADD CONSTRAINT "PageRevision_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "SitePage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditEvent" ADD CONSTRAINT "AuditEvent_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "SitePage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditEvent" ADD CONSTRAINT "AuditEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
