/*
  Warnings:

  - You are about to drop the `_ServiceProvidersOnProperties` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pending_order_requests` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ServiceProvidersOnProperties" DROP CONSTRAINT "_ServiceProvidersOnProperties_A_fkey";

-- DropForeignKey
ALTER TABLE "_ServiceProvidersOnProperties" DROP CONSTRAINT "_ServiceProvidersOnProperties_B_fkey";

-- DropForeignKey
ALTER TABLE "pending_order_requests" DROP CONSTRAINT "pending_order_requests_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "pending_order_requests" DROP CONSTRAINT "pending_order_requests_serviceProviderId_fkey";

-- DropTable
DROP TABLE "_ServiceProvidersOnProperties";

-- DropTable
DROP TABLE "pending_order_requests";

-- CreateTable
CREATE TABLE "order_requests" (
    "pendingOrderId" TEXT NOT NULL,
    "propertyId" TEXT,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "serviceProviderId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_requests_pkey" PRIMARY KEY ("pendingOrderId")
);

-- CreateIndex
CREATE UNIQUE INDEX "order_requests_propertyId_key" ON "order_requests"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "order_requests_serviceProviderId_key" ON "order_requests"("serviceProviderId");

-- AddForeignKey
ALTER TABLE "order_requests" ADD CONSTRAINT "order_requests_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("propertyId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_requests" ADD CONSTRAINT "order_requests_serviceProviderId_fkey" FOREIGN KEY ("serviceProviderId") REFERENCES "serviceProviders"("serviceProviderId") ON DELETE SET NULL ON UPDATE CASCADE;
