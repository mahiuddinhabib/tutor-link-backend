/*
  Warnings:

  - Added the required column `availableServiceId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "availableServiceId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_availableServiceId_fkey" FOREIGN KEY ("availableServiceId") REFERENCES "AvailableService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
