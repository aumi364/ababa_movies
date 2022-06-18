/*
  Warnings:

  - You are about to drop the column `createdAt` on the `filters` table. All the data in the column will be lost.
  - You are about to drop the column `filter_code` on the `filters` table. All the data in the column will be lost.
  - You are about to drop the column `filter_name` on the `filters` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `filters` table. All the data in the column will be lost.
  - You are about to drop the `FilterValuesOnMovies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `filterValues` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `filterTypeId` to the `filters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `filters` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FilterValuesOnMovies" DROP CONSTRAINT "FilterValuesOnMovies_filterId_fkey";

-- DropForeignKey
ALTER TABLE "FilterValuesOnMovies" DROP CONSTRAINT "FilterValuesOnMovies_movieId_fkey";

-- DropForeignKey
ALTER TABLE "filterValues" DROP CONSTRAINT "filterValues_filterId_fkey";

-- DropIndex
DROP INDEX "filters_filter_code_key";

-- AlterTable
ALTER TABLE "filters" DROP COLUMN "createdAt",
DROP COLUMN "filter_code",
DROP COLUMN "filter_name",
DROP COLUMN "updatedAt",
ADD COLUMN     "filterTypeId" INTEGER NOT NULL,
ADD COLUMN     "value" TEXT NOT NULL;

-- DropTable
DROP TABLE "FilterValuesOnMovies";

-- DropTable
DROP TABLE "filterValues";

-- CreateTable
CREATE TABLE "filterTypes" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "filterTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FiltersOnMovies" (
    "filterId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,

    CONSTRAINT "FiltersOnMovies_pkey" PRIMARY KEY ("filterId","movieId")
);

-- CreateIndex
CREATE UNIQUE INDEX "filterTypes_code_key" ON "filterTypes"("code");

-- AddForeignKey
ALTER TABLE "filters" ADD CONSTRAINT "filters_filterTypeId_fkey" FOREIGN KEY ("filterTypeId") REFERENCES "filterTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FiltersOnMovies" ADD CONSTRAINT "FiltersOnMovies_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FiltersOnMovies" ADD CONSTRAINT "FiltersOnMovies_filterId_fkey" FOREIGN KEY ("filterId") REFERENCES "filters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
