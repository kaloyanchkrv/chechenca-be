/*
  Warnings:

  - You are about to drop the `GuardSkills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Skill` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GuardSkills" DROP CONSTRAINT "GuardSkills_guard_id_fkey";

-- DropForeignKey
ALTER TABLE "GuardSkills" DROP CONSTRAINT "GuardSkills_skill_id_fkey";

-- AlterTable
ALTER TABLE "Guard" ADD COLUMN     "has_car" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "has_gun" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_driver" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_guard" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "ending_time" TEXT DEFAULT '',
ADD COLUMN     "has_car" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "has_gun" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_driver" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_guard" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "GuardSkills";

-- DropTable
DROP TABLE "Skill";
