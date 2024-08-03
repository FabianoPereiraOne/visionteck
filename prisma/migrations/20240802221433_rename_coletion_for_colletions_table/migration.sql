/*
  Warnings:

  - You are about to drop the column `coletionId` on the `trains` table. All the data in the column will be lost.
  - You are about to drop the `coletions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "trains" DROP CONSTRAINT "trains_coletionId_fkey";

-- AlterTable
ALTER TABLE "trains" DROP COLUMN "coletionId",
ADD COLUMN     "collectionId" INTEGER;

-- DropTable
DROP TABLE "coletions";

-- CreateTable
CREATE TABLE "collections" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "themeColor" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "collections_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "trains" ADD CONSTRAINT "trains_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE SET NULL ON UPDATE CASCADE;
