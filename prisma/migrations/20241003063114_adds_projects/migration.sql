/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "base_notes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "middle_notes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "top_notes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "budget_in_usd" INTEGER NOT NULL DEFAULT 30000,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_address_key" ON "user"("address");
