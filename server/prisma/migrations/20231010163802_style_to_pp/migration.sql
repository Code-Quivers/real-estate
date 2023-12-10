/*
  Warnings:

  - A unique constraint covering the columns `[styleNo]` on the table `pp_submission` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "styles" DROP CONSTRAINT "styles_ppSubmissionId_fkey";

-- AlterTable
ALTER TABLE "pp_submission" ADD COLUMN     "styleNo" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "pp_submission_styleNo_key" ON "pp_submission"("styleNo");

-- AddForeignKey
ALTER TABLE "pp_submission" ADD CONSTRAINT "pp_submission_styleNo_fkey" FOREIGN KEY ("styleNo") REFERENCES "styles"("styleNo") ON DELETE SET NULL ON UPDATE CASCADE;
