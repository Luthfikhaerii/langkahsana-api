/*
  Warnings:

  - Added the required column `image` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Article" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Trip" ADD COLUMN     "image" TEXT NOT NULL;
