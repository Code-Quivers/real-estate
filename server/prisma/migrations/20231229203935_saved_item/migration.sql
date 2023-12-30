-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('PROPERTY', 'PROPERTY_OWNER', 'SERVICE', 'TENANT');

-- CreateTable
CREATE TABLE "SavedItem" (
    "itemId" TEXT NOT NULL,
    "itemType" "ItemType" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SavedItem_pkey" PRIMARY KEY ("itemId")
);

-- AddForeignKey
ALTER TABLE "SavedItem" ADD CONSTRAINT "SavedItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
