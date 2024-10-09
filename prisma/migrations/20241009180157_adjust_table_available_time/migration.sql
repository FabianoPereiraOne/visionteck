/*
  Warnings:

  - You are about to drop the column `dateMeet` on the `consultations` table. All the data in the column will be lost.
  - Added the required column `date` to the `availablesTimes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `consultations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "availablesTimes" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "consultations" DROP COLUMN "dateMeet",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
