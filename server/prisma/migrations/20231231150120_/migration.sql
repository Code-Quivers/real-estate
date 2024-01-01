/*
  Warnings:

  - Added the required column `itemType` to the `SavedItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SavedItem" ADD COLUMN     "itemType" "ItemType" NOT NULL;
