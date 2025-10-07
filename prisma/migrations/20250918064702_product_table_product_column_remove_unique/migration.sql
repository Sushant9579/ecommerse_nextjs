/*
  Warnings:

  - Made the column `size` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `color` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "public"."Product_product_key";

-- AlterTable
ALTER TABLE "public"."Product" ALTER COLUMN "size" SET NOT NULL,
ALTER COLUMN "color" SET NOT NULL;
