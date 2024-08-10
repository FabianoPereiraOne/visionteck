-- CreateEnum
CREATE TYPE "Bullet" AS ENUM ('BUGS', 'SECURITY', 'OPTIMIZATIONS', 'UPDATES', 'FEATURES', 'COMPATIBILITY', 'INTEGRATIONS');

-- CreateTable
CREATE TABLE "notes" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "bullet" "Bullet" NOT NULL DEFAULT 'FEATURES',
    "bulletColor" TEXT NOT NULL DEFAULT '#086B0B',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);
