/*
  Warnings:

  - A unique constraint covering the columns `[startTime]` on the table `AvailableService` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AvailableService_startTime_key" ON "AvailableService"("startTime");
