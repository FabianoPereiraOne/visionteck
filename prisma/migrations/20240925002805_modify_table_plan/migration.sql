/*
  Warnings:

  - You are about to drop the column `lock` on the `trains` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "plans" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "trains" DROP COLUMN "lock";
