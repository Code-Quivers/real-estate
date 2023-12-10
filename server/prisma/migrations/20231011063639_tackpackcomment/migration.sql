/*
  Warnings:

  - You are about to drop the column `tackpackComment` on the `tackpack` table. All the data in the column will be lost.
  - Added the required column `tackPackComment` to the `tackpack` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tackpack" DROP COLUMN "tackpackComment",
ADD COLUMN     "tackPackComment" TEXT NOT NULL;
