/*
  Warnings:

  - You are about to drop the column `preferred_ehr` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `client_id` on the `ehr_sync_logs` table. All the data in the column will be lost.
  - You are about to drop the column `ehr_provider_code` on the `ehr_sync_logs` table. All the data in the column will be lost.
  - Added the required column `client_ehr_provider_id` to the `ehr_sync_logs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ehr_sync_logs" DROP CONSTRAINT "ehr_sync_logs_client_id_fkey";

-- DropForeignKey
ALTER TABLE "ehr_sync_logs" DROP CONSTRAINT "ehr_sync_logs_ehr_provider_code_fkey";

-- DropIndex
DROP INDEX "idx_client_ehr";

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "preferred_ehr";

-- AlterTable
ALTER TABLE "ehr_sync_logs" DROP COLUMN "client_id",
DROP COLUMN "ehr_provider_code",
ADD COLUMN     "client_ehr_provider_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "client_ehr_providers" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "ehr_provider_code" TEXT NOT NULL,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "credentials" JSONB DEFAULT '{}',
    "settings" JSONB DEFAULT '{}',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_ehr_providers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "client_ehr_providers_client_id_idx" ON "client_ehr_providers"("client_id");

-- CreateIndex
CREATE INDEX "client_ehr_providers_ehr_provider_code_idx" ON "client_ehr_providers"("ehr_provider_code");

-- CreateIndex
CREATE UNIQUE INDEX "client_ehr_providers_client_id_ehr_provider_code_key" ON "client_ehr_providers"("client_id", "ehr_provider_code");

-- AddForeignKey
ALTER TABLE "client_ehr_providers" ADD CONSTRAINT "client_ehr_providers_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_ehr_providers" ADD CONSTRAINT "client_ehr_providers_ehr_provider_code_fkey" FOREIGN KEY ("ehr_provider_code") REFERENCES "ehr_providers"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ehr_sync_logs" ADD CONSTRAINT "ehr_sync_logs_client_ehr_provider_id_fkey" FOREIGN KEY ("client_ehr_provider_id") REFERENCES "client_ehr_providers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
