-- AlterTable
ALTER TABLE "trains" ADD COLUMN     "lock" BOOLEAN DEFAULT false,
ADD COLUMN     "planId" INTEGER;

-- AddForeignKey
ALTER TABLE "trains" ADD CONSTRAINT "trains_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plans"("id") ON DELETE SET NULL ON UPDATE CASCADE;
