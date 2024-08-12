-- DropForeignKey
ALTER TABLE "progress" DROP CONSTRAINT "progress_classId_fkey";

-- AddForeignKey
ALTER TABLE "progress" ADD CONSTRAINT "progress_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
