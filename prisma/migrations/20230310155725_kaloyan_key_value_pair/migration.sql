/*
  Warnings:

  - You are about to drop the column `has_gun` on the `Guard` table. All the data in the column will be lost.
  - You are about to drop the column `is_driver` on the `Guard` table. All the data in the column will be lost.
  - You are about to drop the column `is_guard` on the `Guard` table. All the data in the column will be lost.
  - You are about to drop the column `has_gun` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `is_driver` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `is_guard` on the `Request` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Guard" DROP COLUMN "has_gun",
DROP COLUMN "is_driver",
DROP COLUMN "is_guard",
ADD COLUMN     "key" VARCHAR(256) NOT NULL DEFAULT '',
ADD COLUMN     "value" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "has_gun",
DROP COLUMN "is_driver",
DROP COLUMN "is_guard",
ADD COLUMN     "key" VARCHAR(256) NOT NULL DEFAULT '',
ADD COLUMN     "value" BOOLEAN NOT NULL DEFAULT false;
