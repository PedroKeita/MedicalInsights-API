/*
  Warnings:

  - The `alert` column on the `Analysis` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Analysis" DROP COLUMN "alert",
ADD COLUMN     "alert" BOOLEAN;
