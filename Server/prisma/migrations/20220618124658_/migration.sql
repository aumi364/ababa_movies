/*
  Warnings:

  - You are about to drop the `FiltersOnFavorite` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[movieId]` on the table `favorites` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `favorites` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FiltersOnFavorite" DROP CONSTRAINT "FiltersOnFavorite_favoriteId_fkey";

-- DropForeignKey
ALTER TABLE "FiltersOnFavorite" DROP CONSTRAINT "FiltersOnFavorite_filterId_fkey";

-- AlterTable
ALTER TABLE "favorites" ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "FiltersOnFavorite";

-- CreateTable
CREATE TABLE "FiltersOnMovies" (
    "filterId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,

    CONSTRAINT "FiltersOnMovies_pkey" PRIMARY KEY ("filterId","movieId")
);

-- CreateIndex
CREATE UNIQUE INDEX "favorites_movieId_key" ON "favorites"("movieId");

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FiltersOnMovies" ADD CONSTRAINT "FiltersOnMovies_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FiltersOnMovies" ADD CONSTRAINT "FiltersOnMovies_filterId_fkey" FOREIGN KEY ("filterId") REFERENCES "filters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
