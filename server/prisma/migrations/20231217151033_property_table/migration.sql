-- CreateTable
CREATE TABLE "Property" (
    "propertyId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "numOfBed" INTEGER NOT NULL DEFAULT 1,
    "numOfBath" INTEGER NOT NULL DEFAULT 1,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "maintenanceCoveredTenant" TEXT NOT NULL,
    "maintenanceCoveredOwner" TEXT NOT NULL,
    "schools" TEXT NOT NULL,
    "universities" TEXT NOT NULL,
    "allowedPets" TEXT NOT NULL,
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("propertyId")
);

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "propertyOwners"("propertyOwnerId") ON DELETE RESTRICT ON UPDATE CASCADE;
