-- DropForeignKey
ALTER TABLE "filters" DROP CONSTRAINT "filters_filterTypeId_fkey";

-- AlterTable
ALTER TABLE "filters" ALTER COLUMN "filterTypeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "filters" ADD CONSTRAINT "filters_filterTypeId_fkey" FOREIGN KEY ("filterTypeId") REFERENCES "filterTypes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
