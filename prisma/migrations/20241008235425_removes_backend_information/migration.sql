/*
  Warnings:

  - You are about to drop the column `bought_tokens` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the `project_backers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transfer_transactions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "project_backers" DROP CONSTRAINT "project_backers_project_id_fkey";

-- DropForeignKey
ALTER TABLE "project_backers" DROP CONSTRAINT "project_backers_user_id_fkey";

-- DropForeignKey
ALTER TABLE "transfer_transactions" DROP CONSTRAINT "transfer_transactions_user_id_fkey";

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "bought_tokens";

-- DropTable
DROP TABLE "project_backers";

-- DropTable
DROP TABLE "transfer_transactions";

-- CreateTable
CREATE TABLE "candy_machines" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "collection_key" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "treasury_key" TEXT NOT NULL,

    CONSTRAINT "candy_machines_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "candy_machines_project_id_key" ON "candy_machines"("project_id");

-- AddForeignKey
ALTER TABLE "candy_machines" ADD CONSTRAINT "candy_machines_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
