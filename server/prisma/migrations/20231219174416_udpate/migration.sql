-- AlterTable
ALTER TABLE "propertyOwners" ADD COLUMN     "photo" TEXT;

-- AlterTable
ALTER TABLE "serviceProviders" ADD COLUMN     "phone" TEXT,
ADD COLUMN     "photo" TEXT;

-- AlterTable
ALTER TABLE "tenants" ADD COLUMN     "phone" TEXT,
ADD COLUMN     "photo" TEXT;
