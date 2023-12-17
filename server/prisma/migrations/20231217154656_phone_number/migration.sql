/*
  Warnings:

  - Added the required column `phoneNumber` to the `propertyOwners` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "propertyOwners" ADD COLUMN     "phoneNumber" TEXT NOT NULL;
