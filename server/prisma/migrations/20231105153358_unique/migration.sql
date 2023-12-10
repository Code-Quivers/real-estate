/*
  Warnings:

  - A unique constraint covering the columns `[factoryName]` on the table `factories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[itemName]` on the table `items` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "factories_factoryName_key" ON "factories"("factoryName");

-- CreateIndex
CREATE UNIQUE INDEX "items_itemName_key" ON "items"("itemName");
