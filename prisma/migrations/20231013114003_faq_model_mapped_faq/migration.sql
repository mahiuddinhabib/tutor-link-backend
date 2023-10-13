/*
  Warnings:

  - You are about to drop the `FAQ` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "FAQ";

-- CreateTable
CREATE TABLE "faq" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "faq_pkey" PRIMARY KEY ("id")
);
