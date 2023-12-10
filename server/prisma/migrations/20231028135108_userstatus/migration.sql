/*
  Warnings:

  - The `userIsActive` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('Active', 'Paused', 'Suspended');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "userIsActive",
ADD COLUMN     "userIsActive" "UserStatus" NOT NULL DEFAULT 'Active';
