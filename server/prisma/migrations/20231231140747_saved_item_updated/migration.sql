/*
  Warnings:

  - You are about to drop the column `itemType` on the `SavedItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SavedItem" DROP COLUMN "itemType",
ADD COLUMN     "propertyId" TEXT,
ADD COLUMN     "serviceProviderId" TEXT,
ADD COLUMN     "tenantId" TEXT;

-- AddForeignKey
ALTER TABLE "SavedItem" ADD CONSTRAINT "SavedItem_serviceProviderId_fkey" FOREIGN KEY ("serviceProviderId") REFERENCES "serviceProviders"("serviceProviderId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedItem" ADD CONSTRAINT "SavedItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("tenantId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedItem" ADD CONSTRAINT "SavedItem_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("propertyId") ON DELETE SET NULL ON UPDATE CASCADE;
