/*
  Warnings:

  - Added the required column `friDate` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "friDate" TIMESTAMP(3) NOT NULL;
