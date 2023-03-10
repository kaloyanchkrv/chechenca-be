/*
  Warnings:

  - You are about to drop the column `skills` on the `Guard` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `Request` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Guard" DROP COLUMN "skills",
ADD COLUMN     "has_gun" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_driver" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_guard" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "skills",
ADD COLUMN     "has_gun" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_driver" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_guard" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_taken" BOOLEAN NOT NULL DEFAULT false;
