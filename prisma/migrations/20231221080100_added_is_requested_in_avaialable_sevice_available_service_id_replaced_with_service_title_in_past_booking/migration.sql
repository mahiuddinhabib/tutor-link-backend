/*
  Warnings:

  - You are about to drop the column `availableServiceId` on the `pastBooking` table. All the data in the column will be lost.
  - Added the required column `serviceTitle` to the `pastBooking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AvailableService" ADD COLUMN     "isRequested" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "pastBooking" DROP COLUMN "availableServiceId",
ADD COLUMN     "serviceTitle" TEXT NOT NULL;
