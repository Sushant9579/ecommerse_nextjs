/*
  Warnings:

  - You are about to drop the column `userId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `email` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderID` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userID` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Order" DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "orderID" TEXT NOT NULL,
ADD COLUMN     "paymentInfo" TEXT,
ADD COLUMN     "userID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_userID_fkey" FOREIGN KEY ("userID") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
