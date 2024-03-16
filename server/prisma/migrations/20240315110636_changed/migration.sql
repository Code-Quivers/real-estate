/*
  Warnings:

  - Made the column `propertyId` on table `order_requests` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "order_requests" DROP CONSTRAINT "order_requests_propertyId_fkey";

-- DropIndex
DROP INDEX "order_requests_propertyId_key";

-- AlterTable
ALTER TABLE "order_requests" ALTER COLUMN "propertyId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "order_requests" ADD CONSTRAINT "order_requests_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("propertyId") ON DELETE RESTRICT ON UPDATE CASCADE;
