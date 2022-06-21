-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_movieId_fkey";

-- AlterTable
ALTER TABLE "favorites" ALTER COLUMN "movieId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
