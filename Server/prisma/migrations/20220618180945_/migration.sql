/*
  Warnings:

  - You are about to drop the column `filter_value` on the `filters` table. All the data in the column will be lost.
  - You are about to drop the `FiltersOnMovies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FiltersOnMovies" DROP CONSTRAINT "FiltersOnMovies_filterId_fkey";

-- DropForeignKey
ALTER TABLE "FiltersOnMovies" DROP CONSTRAINT "FiltersOnMovies_movieId_fkey";

-- AlterTable
ALTER TABLE "filters" DROP COLUMN "filter_value";

-- DropTable
DROP TABLE "FiltersOnMovies";

-- CreateTable
CREATE TABLE "filterValues" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "filterId" INTEGER NOT NULL,

    CONSTRAINT "filterValues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FilterValuesOnMovies" (
    "filterId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,

    CONSTRAINT "FilterValuesOnMovies_pkey" PRIMARY KEY ("filterId","movieId")
);

-- AddForeignKey
ALTER TABLE "filterValues" ADD CONSTRAINT "filterValues_filterId_fkey" FOREIGN KEY ("filterId") REFERENCES "filters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilterValuesOnMovies" ADD CONSTRAINT "FilterValuesOnMovies_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilterValuesOnMovies" ADD CONSTRAINT "FilterValuesOnMovies_filterId_fkey" FOREIGN KEY ("filterId") REFERENCES "filters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
