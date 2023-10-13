/*
  Warnings:

  - A unique constraint covering the columns `[availableServiceId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Booking_availableServiceId_key" ON "Booking"("availableServiceId");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_availableServiceId_fkey" FOREIGN KEY ("availableServiceId") REFERENCES "AvailableService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
