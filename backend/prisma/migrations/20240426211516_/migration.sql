/*
  Warnings:

  - You are about to drop the column `location` on the `Booking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "location",
ALTER COLUMN "canceled" SET DEFAULT false;
