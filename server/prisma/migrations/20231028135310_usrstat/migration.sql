/*
  Warnings:

  - You are about to drop the column `userIsActive` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "userIsActive",
ADD COLUMN     "userStatus" "UserStatus" NOT NULL DEFAULT 'Active';
