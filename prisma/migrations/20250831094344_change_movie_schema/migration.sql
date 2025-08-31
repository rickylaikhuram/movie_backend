/*
  Warnings:

  - You are about to drop the column `description` on the `Movies` table. All the data in the column will be lost.
  - You are about to drop the column `genre` on the `Movies` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Movies` table. All the data in the column will be lost.
  - The `averageRating` column on the `Movies` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `updatedAt` to the `Movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Movies" DROP COLUMN "description",
DROP COLUMN "genre",
DROP COLUMN "name",
ADD COLUMN     "backdropUrl" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "genres" TEXT[],
ADD COLUMN     "language" TEXT,
ADD COLUMN     "runtime" INTEGER,
ADD COLUMN     "tmdbId" INTEGER,
ADD COLUMN     "trailerUrl" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "releaseYear" DROP NOT NULL,
ALTER COLUMN "director" DROP NOT NULL,
ALTER COLUMN "posterUrl" DROP NOT NULL,
DROP COLUMN "averageRating",
ADD COLUMN     "averageRating" DOUBLE PRECISION;
