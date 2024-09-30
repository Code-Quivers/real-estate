-- DropForeignKey
ALTER TABLE "propertyOwners" DROP CONSTRAINT "propertyOwners_userId_fkey";

-- AlterTable
ALTER TABLE "propertyOwners" ALTER COLUMN "userId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "ForgetPassword" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "ForgetPassword_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ForgetPassword_email_key" ON "ForgetPassword"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ForgetPassword_token_key" ON "ForgetPassword"("token");

-- CreateIndex
CREATE UNIQUE INDEX "ForgetPassword_link_key" ON "ForgetPassword"("link");

-- AddForeignKey
ALTER TABLE "propertyOwners" ADD CONSTRAINT "propertyOwners_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
