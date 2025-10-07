-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "deliveryStatus" TEXT NOT NULL DEFAULT 'unshipped',
ADD COLUMN     "transactionID" TEXT;
