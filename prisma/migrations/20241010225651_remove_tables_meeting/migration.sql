/*
  Warnings:

  - You are about to drop the `availablesTimes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `consultations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "availablesTimes" DROP CONSTRAINT "availablesTimes_userId_fkey";

-- DropForeignKey
ALTER TABLE "consultations" DROP CONSTRAINT "consultations_availableTimeId_fkey";

-- DropForeignKey
ALTER TABLE "consultations" DROP CONSTRAINT "consultations_userId_fkey";

-- DropTable
DROP TABLE "availablesTimes";

-- DropTable
DROP TABLE "consultations";

-- DropEnum
DROP TYPE "Status";
