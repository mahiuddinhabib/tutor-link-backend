-- CreateTable
CREATE TABLE "pastBooking" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "availableServiceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pastBooking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pastBooking" ADD CONSTRAINT "pastBooking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
