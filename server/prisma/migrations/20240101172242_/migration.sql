/*
  Warnings:

  - You are about to drop the column `servicePriceRange` on the `Services` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Services" DROP COLUMN "servicePriceRange",
ADD COLUMN     "maxPrice" INTEGER,
ADD COLUMN     "minPrice" INTEGER;
