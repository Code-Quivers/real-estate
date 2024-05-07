/*
  Warnings:

  - You are about to drop the column `drivingLicenseNumber` on the `tenants` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tenants" DROP COLUMN "drivingLicenseNumber",
ADD COLUMN     "placeToRent" TEXT;
