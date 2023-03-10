/*
  Warnings:

  - You are about to drop the column `key` on the `Guard` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Guard` table. All the data in the column will be lost.
  - You are about to drop the column `key` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Request` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Guard" DROP COLUMN "key",
DROP COLUMN "value";

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "key",
DROP COLUMN "value";

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "key" VARCHAR(256) NOT NULL DEFAULT '',
    "value" BOOLEAN NOT NULL DEFAULT false,
    "guard_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "requestId" INTEGER,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_guard_id_fkey" FOREIGN KEY ("guard_id") REFERENCES "Guard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE SET NULL ON UPDATE CASCADE;
