/*
  Warnings:

  - Made the column `completedAt` on table `progress` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "progress" ALTER COLUMN "completed" DROP DEFAULT,
ALTER COLUMN "completedAt" SET NOT NULL;
