/*
  Warnings:

  - You are about to drop the column `dateMeet` on the `availablesTimes` table. All the data in the column will be lost.
  - You are about to drop the column `lock` on the `availablesTimes` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `consultations` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `consultations` table. All the data in the column will be lost.
  - Added the required column `isAvailable` to the `availablesTimes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "availablesTimes" DROP COLUMN "dateMeet",
DROP COLUMN "lock",
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL,
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "consultations" DROP COLUMN "endTime",
DROP COLUMN "startTime",
ADD COLUMN     "availableTimeId" INTEGER;

-- AddForeignKey
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_availableTimeId_fkey" FOREIGN KEY ("availableTimeId") REFERENCES "availablesTimes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "availablesTimes" ADD CONSTRAINT "availablesTimes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
