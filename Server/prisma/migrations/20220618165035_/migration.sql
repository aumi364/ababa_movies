/*
  Warnings:

  - A unique constraint covering the columns `[filter_code]` on the table `filters` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "filters_filter_code_key" ON "filters"("filter_code");
