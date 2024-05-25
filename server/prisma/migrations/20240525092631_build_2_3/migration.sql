/*
  Warnings:

  - Changed the type of `issueType` on the `maintenance_requests` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "tenants" DROP CONSTRAINT "tenants_userId_fkey";

-- AlterTable
ALTER TABLE "maintenance_requests" DROP COLUMN "issueType",
ADD COLUMN     "issueType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tenants" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tenants" ADD CONSTRAINT "tenants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
