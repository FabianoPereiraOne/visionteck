/*
  Warnings:

  - You are about to drop the `AvailableTime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Consultations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Consultations" DROP CONSTRAINT "Consultations_userId_fkey";

-- DropTable
DROP TABLE "AvailableTime";

-- DropTable
DROP TABLE "Consultations";

-- CreateTable
CREATE TABLE "consultations" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "dateMeet" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL,
    "meetingLink" TEXT,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "consultations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "availablesTimes" (
    "id" SERIAL NOT NULL,
    "dateMeet" TIMESTAMP(3) NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "lock" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "availablesTimes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
