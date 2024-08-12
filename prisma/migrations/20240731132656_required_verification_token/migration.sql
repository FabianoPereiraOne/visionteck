/*
  Warnings:

  - Made the column `verificationToken` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "verificationToken" SET NOT NULL;
