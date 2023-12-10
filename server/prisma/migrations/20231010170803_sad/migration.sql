/*
  Warnings:

  - Made the column `styleNo` on table `pp_submission` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "pp_submission" DROP CONSTRAINT "pp_submission_styleNo_fkey";

-- AlterTable
ALTER TABLE "pp_submission" ALTER COLUMN "styleNo" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "pp_submission" ADD CONSTRAINT "pp_submission_styleNo_fkey" FOREIGN KEY ("styleNo") REFERENCES "styles"("styleNo") ON DELETE RESTRICT ON UPDATE CASCADE;
