-- DropForeignKey
ALTER TABLE "public"."Content" DROP CONSTRAINT "Content_id_article_fkey";

-- DropForeignKey
ALTER TABLE "public"."Participant" DROP CONSTRAINT "Participant_trip_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."TripContent" DROP CONSTRAINT "TripContent_id_trip_fkey";

-- AddForeignKey
ALTER TABLE "public"."Content" ADD CONSTRAINT "Content_id_article_fkey" FOREIGN KEY ("id_article") REFERENCES "public"."Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TripContent" ADD CONSTRAINT "TripContent_id_trip_fkey" FOREIGN KEY ("id_trip") REFERENCES "public"."Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Participant" ADD CONSTRAINT "Participant_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "public"."Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
