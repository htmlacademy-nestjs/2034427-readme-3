/*
  Warnings:

  - The `original_id` column on the `posts` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "original_id",
ADD COLUMN     "original_id" INTEGER;
