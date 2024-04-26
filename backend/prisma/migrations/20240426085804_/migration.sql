-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_bookingId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "bookingId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;
