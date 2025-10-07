-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "city" TEXT NOT NULL DEFAULT 'Unknown',
ADD COLUMN     "state" TEXT NOT NULL DEFAULT 'Unknown';

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "city" TEXT NOT NULL DEFAULT 'Unknown',
ADD COLUMN     "state" TEXT NOT NULL DEFAULT 'Unknown';
