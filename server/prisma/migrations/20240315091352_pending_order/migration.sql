-- CreateTable
CREATE TABLE "pending_order_requests" (
    "pendingOrderId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "serviceProviderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pending_order_requests_pkey" PRIMARY KEY ("pendingOrderId")
);

-- AddForeignKey
ALTER TABLE "pending_order_requests" ADD CONSTRAINT "pending_order_requests_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("propertyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pending_order_requests" ADD CONSTRAINT "pending_order_requests_serviceProviderId_fkey" FOREIGN KEY ("serviceProviderId") REFERENCES "serviceProviders"("serviceProviderId") ON DELETE RESTRICT ON UPDATE CASCADE;
