/*
  Warnings:

  - You are about to drop the `faq` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "faq";

-- CreateTable
CREATE TABLE "FAQ" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "FAQ_pkey" PRIMARY KEY ("id")
);
