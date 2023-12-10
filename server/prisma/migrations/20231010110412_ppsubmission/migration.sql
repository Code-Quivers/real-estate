/*
  Warnings:

  - A unique constraint covering the columns `[ppSubmissionId]` on the table `styles` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "styles" DROP CONSTRAINT "styles_factoryId_fkey";

-- AlterTable
ALTER TABLE "styles" ADD COLUMN     "ppSubmissionId" TEXT,
ALTER COLUMN "factoryId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "pp_submission" (
    "ppSubmissionId" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "factorySubmissionDate" TIMESTAMP(3) NOT NULL,
    "factorySubmittedDate" TIMESTAMP(3),
    "delayDays" TEXT,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "pp_submission_pkey" PRIMARY KEY ("ppSubmissionId")
);

-- CreateTable
CREATE TABLE "ldCpAopStatus" (
    "ldCpAopStatusId" TEXT NOT NULL,
    "ldCpAopStatusComment" TEXT NOT NULL,
    "styleNo" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "ldCpAopStatus_pkey" PRIMARY KEY ("ldCpAopStatusId")
);

-- CreateTable
CREATE TABLE "tackpack" (
    "tackpackId" TEXT NOT NULL,
    "tackFile" TEXT NOT NULL,
    "styleNo" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "tackpack_pkey" PRIMARY KEY ("tackpackId")
);

-- CreateIndex
CREATE UNIQUE INDEX "pp_submission_ppSubmissionId_key" ON "pp_submission"("ppSubmissionId");

-- CreateIndex
CREATE UNIQUE INDEX "styles_ppSubmissionId_key" ON "styles"("ppSubmissionId");

-- AddForeignKey
ALTER TABLE "styles" ADD CONSTRAINT "styles_factoryId_fkey" FOREIGN KEY ("factoryId") REFERENCES "factories"("factoryId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "styles" ADD CONSTRAINT "styles_ppSubmissionId_fkey" FOREIGN KEY ("ppSubmissionId") REFERENCES "pp_submission"("ppSubmissionId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pp_submission" ADD CONSTRAINT "pp_submission_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("profileId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ldCpAopStatus" ADD CONSTRAINT "ldCpAopStatus_styleNo_fkey" FOREIGN KEY ("styleNo") REFERENCES "styles"("styleNo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ldCpAopStatus" ADD CONSTRAINT "ldCpAopStatus_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("profileId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tackpack" ADD CONSTRAINT "tackpack_styleNo_fkey" FOREIGN KEY ("styleNo") REFERENCES "styles"("styleNo") ON DELETE RESTRICT ON UPDATE CASCADE;
