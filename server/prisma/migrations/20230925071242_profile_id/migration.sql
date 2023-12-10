/*
  Warnings:

  - Added the required column `profileId` to the `bulk_production_status` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `pp_strike_off_status` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bulk_production_status" ADD COLUMN     "profileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pp_strike_off_status" ADD COLUMN     "profileId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pp_strike_off_status" ADD CONSTRAINT "pp_strike_off_status_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("profileId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bulk_production_status" ADD CONSTRAINT "bulk_production_status_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("profileId") ON DELETE RESTRICT ON UPDATE CASCADE;
