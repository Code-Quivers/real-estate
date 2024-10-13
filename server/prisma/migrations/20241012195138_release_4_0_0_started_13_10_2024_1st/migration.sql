-- CreateEnum
CREATE TYPE "PLATFORM" AS ENUM ('PAYPAL', 'STRIPE');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'PAUSED', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'CONFIRMED', 'FAILED');

-- CreateEnum
CREATE TYPE "PlanType" AS ENUM ('PENDING', 'ON_TRIAL', 'PREMIUM');

-- CreateEnum
CREATE TYPE "MaintenanceRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'ACTIVE', 'PAUSED', 'CANCEL', 'COMPLETED');

-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('TENANT_SCREENING', 'MAINTENANCE_AND_REPAIR', 'CLEANING', 'PEST_CONTROL', 'LAWN_CARE', 'SECURITY_AND_SAFETY', 'INSURANCE', 'INSPECTION', 'MARKETING', 'TECHNOLOGY', 'OTHERS');

-- CreateEnum
CREATE TYPE "ServiceAvailabilityEnum" AS ENUM ('LOW_PRIORITY', 'MEDIUM_PRIORITY', 'HIGH_PRIORITY', 'ALL_PRIORITIES');

-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('SUPERADMIN', 'TENANT', 'PROPERTY_OWNER', 'SERVICE_PROVIDER');

-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('PROPERTY', 'PROPERTY_OWNER', 'SERVICE', 'TENANT');

-- CreateEnum
CREATE TYPE "RequestMaintenancePriorityEnum" AS ENUM ('LOW_PRIORITY', 'MEDIUM_PRIORITY', 'HIGH_PRIORITY');

-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('MONTHLY', 'ANNUALLY', 'TAX', 'TENANT_INFO');

-- CreateEnum
CREATE TYPE "PackageType" AS ENUM ('NONE', 'MONTHLY', 'QUATERLY', 'BIANNUALLY', 'ANNUALLY');

-- CreateTable
CREATE TABLE "orders" (
    "orderId" TEXT NOT NULL,
    "orderStatus" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "packageType" "PackageType" NOT NULL DEFAULT 'NONE',
    "ownerId" TEXT,
    "tenantId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "payment_informations" (
    "id" TEXT NOT NULL,
    "paymentPlatformId" TEXT NOT NULL,
    "platform" "PLATFORM" NOT NULL,
    "paymentStatus" TEXT NOT NULL,
    "amountToPay" DOUBLE PRECISION NOT NULL,
    "amountPaid" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "platformFee" DOUBLE PRECISION NOT NULL,
    "netAmount" DOUBLE PRECISION NOT NULL,
    "transactionCreatedTime" TIMESTAMP(3) NOT NULL,
    "orderId" TEXT,
    "userId" TEXT,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "payment_informations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancialAccount" (
    "id" TEXT NOT NULL,
    "finOrgAccountId" TEXT NOT NULL,
    "email" TEXT,
    "externalAccount" JSONB,
    "payoutsEnable" BOOLEAN NOT NULL DEFAULT false,
    "chargesEnabled" BOOLEAN NOT NULL DEFAULT false,
    "transfers" BOOLEAN NOT NULL DEFAULT false,
    "isCustomAccount" BOOLEAN NOT NULL DEFAULT true,
    "detailsSubmitted" BOOLEAN NOT NULL DEFAULT false,
    "ownerId" TEXT,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "FinancialAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conversations" (
    "conversationId" TEXT NOT NULL,
    "lastMessage" TEXT NOT NULL DEFAULT 'Lets Say Hello',
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Conversations_pkey" PRIMARY KEY ("conversationId")
);

-- CreateTable
CREATE TABLE "Messages" (
    "messageId" TEXT NOT NULL,
    "text" TEXT,
    "images" TEXT[],
    "conversationId" TEXT,
    "senderId" TEXT,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("messageId")
);

-- CreateTable
CREATE TABLE "documents" (
    "documentId" TEXT NOT NULL,
    "documentTitle" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "isValid" BOOLEAN NOT NULL DEFAULT true,
    "isSignedByOwner" BOOLEAN NOT NULL DEFAULT true,
    "isSignedByTenant" BOOLEAN NOT NULL DEFAULT false,
    "ownerId" TEXT NOT NULL,
    "tenantId" TEXT,
    "propertyId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("documentId")
);

-- CreateTable
CREATE TABLE "forget_passwords" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "forget_passwords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "properties" (
    "propertyId" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Property Title',
    "numOfBed" INTEGER NOT NULL DEFAULT 1,
    "numOfBath" INTEGER NOT NULL DEFAULT 1,
    "monthlyRent" INTEGER NOT NULL DEFAULT 1,
    "address" TEXT NOT NULL,
    "maintenanceCoveredTenant" TEXT NOT NULL,
    "maintenanceCoveredOwner" TEXT NOT NULL,
    "description" TEXT,
    "schools" TEXT,
    "universities" TEXT,
    "allowedPets" TEXT,
    "images" TEXT[],
    "isRented" BOOLEAN NOT NULL DEFAULT false,
    "planType" "PlanType" NOT NULL DEFAULT 'PENDING',
    "packageType" "PackageType" NOT NULL DEFAULT 'NONE',
    "paidFrom" TIMESTAMP(3),
    "paidTo" TIMESTAMP(3),
    "pendingPaidTo" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tenantAssignedAt" TIMESTAMP(3),
    "ownerId" TEXT,
    "score" DOUBLE PRECISION NOT NULL DEFAULT 60,
    "scoreRatio" JSONB,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("propertyId")
);

-- CreateTable
CREATE TABLE "reports" (
    "reportId" TEXT NOT NULL,
    "reportTitle" TEXT NOT NULL,
    "reportType" "ReportType" NOT NULL,
    "information" JSONB[],
    "rentAmount" DOUBLE PRECISION,
    "collectedRent" DOUBLE PRECISION,
    "expenses" DOUBLE PRECISION,
    "grossProfit" DOUBLE PRECISION,
    "documentFile" TEXT,
    "propertyId" TEXT,
    "propertyOwnerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("reportId")
);

-- CreateTable
CREATE TABLE "Services" (
    "serviceId" TEXT NOT NULL,
    "minPrice" DOUBLE PRECISION,
    "maxPrice" DOUBLE PRECISION,
    "serviceDescription" TEXT,
    "serviceLocation" TEXT,
    "serviceCancellationPolicy" TEXT,
    "serviceAvailability" "ServiceAvailabilityEnum",
    "serviceType" "ServiceType",
    "ownerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("serviceId")
);

-- CreateTable
CREATE TABLE "maintenance_requests" (
    "maintenanceRequestId" TEXT NOT NULL,
    "propertyId" TEXT,
    "tenantId" TEXT,
    "ownerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isAnimal" BOOLEAN,
    "animalDetails" TEXT,
    "issueLocation" TEXT NOT NULL,
    "priority" "RequestMaintenancePriorityEnum" NOT NULL,
    "issueType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT[],
    "status" "MaintenanceRequestStatus" NOT NULL DEFAULT 'PENDING',
    "maintenanceDetails" JSONB,
    "serviceProviderId" TEXT,

    CONSTRAINT "maintenance_requests_pkey" PRIMARY KEY ("maintenanceRequestId")
);

-- CreateTable
CREATE TABLE "SavedItem" (
    "itemId" TEXT NOT NULL,
    "itemType" "ItemType" NOT NULL,
    "serviceProviderId" TEXT,
    "tenantId" TEXT,
    "propertyId" TEXT,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SavedItem_pkey" PRIMARY KEY ("itemId")
);

-- CreateTable
CREATE TABLE "users" (
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userStatus" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,
    "role" "UserRoles" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "propertyOwners" (
    "propertyOwnerId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "profileImage" TEXT,
    "extraCosts" JSONB[],
    "score" DOUBLE PRECISION NOT NULL DEFAULT 10,
    "scoreRatio" JSONB,
    "templates" JSONB[],
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "propertyOwners_pkey" PRIMARY KEY ("propertyOwnerId")
);

-- CreateTable
CREATE TABLE "tenants" (
    "tenantId" TEXT NOT NULL,
    "userId" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "profileImage" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "socialSecurityNumber" TEXT,
    "presentAddress" TEXT,
    "phoneNumber" TEXT,
    "placeToRent" TEXT,
    "isCriminalRecord" BOOLEAN,
    "criminalRecordDescription" TEXT,
    "prevLandlordName" TEXT,
    "prevLandlordContactInfo" TEXT,
    "lengthOfPrevTenancy" TEXT,
    "affordableRentAmount" INTEGER DEFAULT 0,
    "leavingReason" TEXT,
    "isAnyLatePaymentReason" TEXT,
    "CurrentEmployerOrBusinessName" TEXT,
    "CurrentEmployerOrBusinessContactInfo" TEXT,
    "JobTitle" TEXT,
    "AnnualSalary" INTEGER,
    "OtherIncomeSource" TEXT,
    "CurrentCreditScore" INTEGER,
    "isPets" BOOLEAN,
    "typeOfPets" TEXT,
    "isPetVaccinated" BOOLEAN,
    "isSmoker" BOOLEAN,
    "allergies" TEXT,
    "isHaveOtherMember" BOOLEAN,
    "numberOfMember" INTEGER,
    "isWillingToSignLeasingAgreement" BOOLEAN,
    "isAnyExtraToMention" TEXT,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,
    "propertyId" TEXT,
    "score" DOUBLE PRECISION NOT NULL DEFAULT 10,
    "scoreRatio" JSONB,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("tenantId")
);

-- CreateTable
CREATE TABLE "serviceProviders" (
    "serviceProviderId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "profileImage" TEXT,
    "phoneNumber" TEXT,
    "companyName" TEXT,
    "companyAddress" TEXT,
    "companyPhoneNumber" TEXT,
    "companyEmailAddress" TEXT,
    "userId" TEXT,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,
    "score" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "scoreRatio" JSONB,

    CONSTRAINT "serviceProviders_pkey" PRIMARY KEY ("serviceProviderId")
);

-- CreateTable
CREATE TABLE "_OrderToProperty" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ConversationToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PropertyToServiceProvider" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "payment_informations_paymentPlatformId_key" ON "payment_informations"("paymentPlatformId");

-- CreateIndex
CREATE UNIQUE INDEX "payment_informations_orderId_key" ON "payment_informations"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "FinancialAccount_finOrgAccountId_key" ON "FinancialAccount"("finOrgAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "FinancialAccount_email_key" ON "FinancialAccount"("email");

-- CreateIndex
CREATE UNIQUE INDEX "FinancialAccount_ownerId_key" ON "FinancialAccount"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "forget_passwords_email_key" ON "forget_passwords"("email");

-- CreateIndex
CREATE UNIQUE INDEX "forget_passwords_token_key" ON "forget_passwords"("token");

-- CreateIndex
CREATE UNIQUE INDEX "forget_passwords_link_key" ON "forget_passwords"("link");

-- CreateIndex
CREATE UNIQUE INDEX "Services_ownerId_key" ON "Services"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedItem_userId_serviceProviderId_key" ON "SavedItem"("userId", "serviceProviderId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedItem_userId_tenantId_key" ON "SavedItem"("userId", "tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedItem_userId_propertyId_key" ON "SavedItem"("userId", "propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_userName_key" ON "users"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "propertyOwners_userId_key" ON "propertyOwners"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "tenants_userId_key" ON "tenants"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "tenants_propertyId_key" ON "tenants"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "serviceProviders_userId_key" ON "serviceProviders"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_OrderToProperty_AB_unique" ON "_OrderToProperty"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderToProperty_B_index" ON "_OrderToProperty"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ConversationToUser_AB_unique" ON "_ConversationToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ConversationToUser_B_index" ON "_ConversationToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PropertyToServiceProvider_AB_unique" ON "_PropertyToServiceProvider"("A", "B");

-- CreateIndex
CREATE INDEX "_PropertyToServiceProvider_B_index" ON "_PropertyToServiceProvider"("B");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "propertyOwners"("propertyOwnerId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("tenantId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_informations" ADD CONSTRAINT "payment_informations_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("orderId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_informations" ADD CONSTRAINT "payment_informations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialAccount" ADD CONSTRAINT "FinancialAccount_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "propertyOwners"("propertyOwnerId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversations"("conversationId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "propertyOwners"("propertyOwnerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("tenantId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("propertyId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "propertyOwners"("propertyOwnerId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_propertyOwnerId_fkey" FOREIGN KEY ("propertyOwnerId") REFERENCES "propertyOwners"("propertyOwnerId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "serviceProviders"("serviceProviderId") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_requests" ADD CONSTRAINT "maintenance_requests_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("propertyId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_requests" ADD CONSTRAINT "maintenance_requests_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("tenantId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_requests" ADD CONSTRAINT "maintenance_requests_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "propertyOwners"("propertyOwnerId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_requests" ADD CONSTRAINT "maintenance_requests_serviceProviderId_fkey" FOREIGN KEY ("serviceProviderId") REFERENCES "serviceProviders"("serviceProviderId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedItem" ADD CONSTRAINT "SavedItem_serviceProviderId_fkey" FOREIGN KEY ("serviceProviderId") REFERENCES "serviceProviders"("serviceProviderId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedItem" ADD CONSTRAINT "SavedItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("tenantId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedItem" ADD CONSTRAINT "SavedItem_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("propertyId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedItem" ADD CONSTRAINT "SavedItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "propertyOwners" ADD CONSTRAINT "propertyOwners_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tenants" ADD CONSTRAINT "tenants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tenants" ADD CONSTRAINT "tenants_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("propertyId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "serviceProviders" ADD CONSTRAINT "serviceProviders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToProperty" ADD CONSTRAINT "_OrderToProperty_A_fkey" FOREIGN KEY ("A") REFERENCES "orders"("orderId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToProperty" ADD CONSTRAINT "_OrderToProperty_B_fkey" FOREIGN KEY ("B") REFERENCES "properties"("propertyId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConversationToUser" ADD CONSTRAINT "_ConversationToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Conversations"("conversationId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConversationToUser" ADD CONSTRAINT "_ConversationToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyToServiceProvider" ADD CONSTRAINT "_PropertyToServiceProvider_A_fkey" FOREIGN KEY ("A") REFERENCES "properties"("propertyId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyToServiceProvider" ADD CONSTRAINT "_PropertyToServiceProvider_B_fkey" FOREIGN KEY ("B") REFERENCES "serviceProviders"("serviceProviderId") ON DELETE CASCADE ON UPDATE CASCADE;
