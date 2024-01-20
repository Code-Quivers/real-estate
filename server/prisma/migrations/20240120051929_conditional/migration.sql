-- DropForeignKey
ALTER TABLE "SavedItem" DROP CONSTRAINT "SavedItem_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "SavedItem" DROP CONSTRAINT "SavedItem_serviceProviderId_fkey";

-- DropForeignKey
ALTER TABLE "SavedItem" DROP CONSTRAINT "SavedItem_tenantId_fkey";

-- AlterTable
ALTER TABLE "SavedItem" ALTER COLUMN "serviceProviderId" DROP NOT NULL,
ALTER COLUMN "tenantId" DROP NOT NULL,
ALTER COLUMN "propertyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "SavedItem" ADD CONSTRAINT "SavedItem_serviceProviderId_fkey" FOREIGN KEY ("serviceProviderId") REFERENCES "serviceProviders"("serviceProviderId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedItem" ADD CONSTRAINT "SavedItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("tenantId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedItem" ADD CONSTRAINT "SavedItem_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("propertyId") ON DELETE SET NULL ON UPDATE CASCADE;
