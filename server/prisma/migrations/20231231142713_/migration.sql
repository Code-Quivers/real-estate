/*
  Warnings:

  - A unique constraint covering the columns `[serviceProviderId]` on the table `SavedItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tenantId]` on the table `SavedItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[propertyId]` on the table `SavedItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SavedItem_serviceProviderId_key" ON "SavedItem"("serviceProviderId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedItem_tenantId_key" ON "SavedItem"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedItem_propertyId_key" ON "SavedItem"("propertyId");
