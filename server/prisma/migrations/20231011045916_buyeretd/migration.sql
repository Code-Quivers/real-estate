/*
  Warnings:

  - Changed the type of `buyerEtd` on the `orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `factoryEtd` on the `orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `tackpackComment` to the `tackpack` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "buyerEtd",
ADD COLUMN     "buyerEtd" TIMESTAMP(3) NOT NULL,
DROP COLUMN "factoryEtd",
ADD COLUMN     "factoryEtd" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "tackpack" ADD COLUMN     "tackpackComment" TEXT NOT NULL;
