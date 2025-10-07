/*
  Warnings:

  - Added the required column `color` to the `ProductOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `ProductOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `ProductOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."ProductOrder" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "size" TEXT NOT NULL;
