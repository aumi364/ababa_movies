/*
  Warnings:

  - A unique constraint covering the columns `[value]` on the table `filters` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "filters_value_key" ON "filters"("value");
