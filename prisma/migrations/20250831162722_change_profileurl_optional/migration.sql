-- AlterTable
ALTER TABLE "public"."Review" ALTER COLUMN "rating" SET DEFAULT 'ZERO';

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "profileUrl" DROP NOT NULL;
