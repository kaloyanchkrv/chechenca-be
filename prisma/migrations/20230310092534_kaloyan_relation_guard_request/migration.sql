-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "guard_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_guard_id_fkey" FOREIGN KEY ("guard_id") REFERENCES "Guard"("id") ON DELETE SET NULL ON UPDATE CASCADE;
