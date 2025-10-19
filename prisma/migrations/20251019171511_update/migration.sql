-- DropForeignKey
ALTER TABLE "public"."Analysis" DROP CONSTRAINT "Analysis_patientId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Vitals" DROP CONSTRAINT "Vitals_patientId_fkey";

-- AddForeignKey
ALTER TABLE "Analysis" ADD CONSTRAINT "Analysis_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vitals" ADD CONSTRAINT "Vitals_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
