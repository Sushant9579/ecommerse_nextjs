/*
  Warnings:

  - You are about to drop the column `userID` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_userID_fkey";

-- AlterTable
ALTER TABLE "public"."Order" DROP COLUMN "userID";

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_email_fkey" FOREIGN KEY ("email") REFERENCES "public"."User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
