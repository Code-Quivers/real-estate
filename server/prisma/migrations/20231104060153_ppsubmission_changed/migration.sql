/*
  Warnings:

  - The `delayDays` column on the `pp_submission` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "pp_submission" DROP COLUMN "delayDays",
ADD COLUMN     "delayDays" INTEGER;
