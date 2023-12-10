/*
  Warnings:

  - You are about to drop the column `profileId` on the `pp_submission` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "pp_submission" DROP CONSTRAINT "pp_submission_profileId_fkey";

-- AlterTable
ALTER TABLE "pp_submission" DROP COLUMN "profileId";
