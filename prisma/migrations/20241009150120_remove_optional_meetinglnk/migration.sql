/*
  Warnings:

  - Made the column `meetingLink` on table `consultations` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "consultations" ALTER COLUMN "meetingLink" SET NOT NULL;
