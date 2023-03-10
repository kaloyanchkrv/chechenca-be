/*
  Warnings:

  - You are about to drop the column `key` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Skill` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_guard_id_fkey";

-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_requestId_fkey";

-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "key",
DROP COLUMN "value",
ADD COLUMN     "has_gun" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_driver" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_guard" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "GuardSkills" (
    "id" SERIAL NOT NULL,
    "guard_id" INTEGER NOT NULL,
    "skill_id" INTEGER NOT NULL,

    CONSTRAINT "GuardSkills_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GuardSkills_guard_id_skill_id_idx" ON "GuardSkills"("guard_id", "skill_id");

-- AddForeignKey
ALTER TABLE "GuardSkills" ADD CONSTRAINT "GuardSkills_guard_id_fkey" FOREIGN KEY ("guard_id") REFERENCES "Guard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuardSkills" ADD CONSTRAINT "GuardSkills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
