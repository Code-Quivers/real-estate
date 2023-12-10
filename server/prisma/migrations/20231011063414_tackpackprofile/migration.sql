/*
  Warnings:

  - Added the required column `profileId` to the `tackpack` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tackpack" ADD COLUMN     "profileId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "tackpack" ADD CONSTRAINT "tackpack_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("profileId") ON DELETE RESTRICT ON UPDATE CASCADE;
