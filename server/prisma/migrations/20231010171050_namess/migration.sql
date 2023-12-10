/*
  Warnings:

  - You are about to drop the column `ppSubmissionId` on the `styles` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "styles_ppSubmissionId_key";

-- AlterTable
ALTER TABLE "styles" DROP COLUMN "ppSubmissionId";
