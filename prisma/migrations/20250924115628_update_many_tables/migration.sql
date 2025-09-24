/*
  Warnings:

  - Added the required column `type` to the `Content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `TripContent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Content" ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."TripContent" ADD COLUMN     "type" TEXT NOT NULL;
