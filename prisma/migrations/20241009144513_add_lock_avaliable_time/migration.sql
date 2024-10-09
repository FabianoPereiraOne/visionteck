/*
  Warnings:

  - Added the required column `lock` to the `AvailableTime` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AvailableTime" ADD COLUMN     "lock" BOOLEAN NOT NULL;
