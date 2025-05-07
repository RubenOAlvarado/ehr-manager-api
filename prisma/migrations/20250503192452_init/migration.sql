-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('TEXT', 'NUMBER', 'BOOLEAN', 'MULTIPLE_CHOICE', 'DATE', 'TIME', 'DATETIME', 'FILE', 'SCALE');

-- CreateEnum
CREATE TYPE "ResponseDataType" AS ENUM ('STRING', 'INTEGER', 'FLOAT', 'BOOLEAN', 'DATE', 'TIME', 'DATETIME', 'JSON', 'BLOB');

-- CreateEnum
CREATE TYPE "SyncStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED', 'RETRY_SCHEDULED');

-- CreateEnum
CREATE TYPE "OperationType" AS ENUM ('IMPORT_PATIENTS', 'EXPORT_RESPONSES', 'SYNC_EHR', 'UPDATE_MAPPINGS', 'GENERATE_REPORTS');

-- CreateEnum
CREATE TYPE "ActionType" AS ENUM ('CREATE', 'READ', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'EXPORT', 'IMPORT');

-- CreateTable
CREATE TABLE "languages" (
    "code" VARCHAR(5) NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "languages_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "ehr_providers" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "base_url" TEXT NOT NULL,
    "auth_config" JSONB NOT NULL DEFAULT '{}',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ehr_providers_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "external_id" TEXT,
    "preferred_ehr" TEXT NOT NULL,
    "default_language" TEXT NOT NULL,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_sets" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "question_sets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base_questions" (
    "id" TEXT NOT NULL,
    "internal_code" TEXT NOT NULL,
    "question_type" "QuestionType" NOT NULL,
    "response_data_type" "ResponseDataType" NOT NULL,
    "validation_rules" JSONB NOT NULL DEFAULT '{}',
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "base_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" TEXT NOT NULL,
    "base_question_id" TEXT NOT NULL,
    "question_set_id" TEXT NOT NULL,
    "language_code" TEXT NOT NULL,
    "question_text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ehr_mappings" (
    "id" TEXT NOT NULL,
    "base_question_id" TEXT NOT NULL,
    "ehr_provider_code" TEXT NOT NULL,
    "ehr_field_path" TEXT NOT NULL,
    "ehr_field_type" TEXT NOT NULL,
    "transformation_rule" TEXT,
    "ehr_endpoint" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ehr_mappings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patients" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "external_id" TEXT,
    "basic_info" JSONB NOT NULL DEFAULT '{}',
    "preferred_language" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient_responses" (
    "id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "base_question_id" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "response_meta" JSONB NOT NULL DEFAULT '{}',
    "session_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patient_responses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ehr_sync_logs" (
    "id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "ehr_provider_code" TEXT NOT NULL,
    "sync_status" "SyncStatus" NOT NULL,
    "request_payload" JSONB,
    "response_payload" JSONB,
    "error_details" JSONB,
    "retry_count" INTEGER NOT NULL DEFAULT 0,
    "next_retry_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ehr_sync_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bulk_operations" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "operation_type" "OperationType" NOT NULL,
    "status" "SyncStatus" NOT NULL DEFAULT 'PENDING',
    "parameters" JSONB NOT NULL DEFAULT '{}',
    "created_by" TEXT,
    "processed_count" INTEGER NOT NULL DEFAULT 0,
    "total_count" INTEGER NOT NULL DEFAULT 0,
    "error_log" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "bulk_operations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "action_type" "ActionType" NOT NULL,
    "table_name" TEXT,
    "record_id" TEXT,
    "old_values" JSONB,
    "new_values" JSONB,
    "performed_by" TEXT,
    "performed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip_address" TEXT,
    "user_agent" TEXT,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ehr_mappings_cache" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "ehr_provider_code" TEXT NOT NULL,
    "base_question_id" TEXT NOT NULL,
    "mapping_data" JSONB NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ehr_mappings_cache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_client_ehr" ON "clients"("preferred_ehr");

-- CreateIndex
CREATE UNIQUE INDEX "base_questions_internal_code_key" ON "base_questions"("internal_code");

-- CreateIndex
CREATE INDEX "idx_base_questions_code" ON "base_questions"("internal_code");

-- CreateIndex
CREATE INDEX "idx_questions_set" ON "questions"("question_set_id");

-- CreateIndex
CREATE INDEX "idx_questions_language" ON "questions"("language_code");

-- CreateIndex
CREATE UNIQUE INDEX "questions_base_question_id_question_set_id_language_code_key" ON "questions"("base_question_id", "question_set_id", "language_code");

-- CreateIndex
CREATE INDEX "idx_ehr_mappings_provider" ON "ehr_mappings"("ehr_provider_code");

-- CreateIndex
CREATE INDEX "idx_ehr_mappings_active" ON "ehr_mappings"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "ehr_mappings_base_question_id_ehr_provider_code_key" ON "ehr_mappings"("base_question_id", "ehr_provider_code");

-- CreateIndex
CREATE INDEX "idx_patients_client" ON "patients"("client_id");

-- CreateIndex
CREATE INDEX "idx_patients_external_id" ON "patients"("external_id");

-- CreateIndex
CREATE INDEX "idx_patients_active" ON "patients"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "patients_client_id_external_id_key" ON "patients"("client_id", "external_id");

-- CreateIndex
CREATE INDEX "idx_patient_responses_patient" ON "patient_responses"("patient_id");

-- CreateIndex
CREATE INDEX "idx_patient_responses_question" ON "patient_responses"("base_question_id");

-- CreateIndex
CREATE INDEX "idx_patient_responses_composite" ON "patient_responses"("patient_id", "base_question_id");

-- CreateIndex
CREATE UNIQUE INDEX "patient_responses_patient_id_base_question_id_session_id_key" ON "patient_responses"("patient_id", "base_question_id", "session_id");

-- CreateIndex
CREATE INDEX "idx_ehr_sync_logs_patient" ON "ehr_sync_logs"("patient_id");

-- CreateIndex
CREATE INDEX "idx_ehr_sync_logs_status" ON "ehr_sync_logs"("sync_status");

-- CreateIndex
CREATE INDEX "idx_ehr_sync_logs_created_at" ON "ehr_sync_logs"("created_at");

-- CreateIndex
CREATE INDEX "idx_ehr_sync_logs_retry" ON "ehr_sync_logs"("next_retry_at");

-- CreateIndex
CREATE INDEX "idx_mappings_cache_expiry" ON "ehr_mappings_cache"("expires_at");

-- CreateIndex
CREATE UNIQUE INDEX "ehr_mappings_cache_client_id_ehr_provider_code_base_questio_key" ON "ehr_mappings_cache"("client_id", "ehr_provider_code", "base_question_id");

-- AddForeignKey
ALTER TABLE "question_sets" ADD CONSTRAINT "question_sets_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_base_question_id_fkey" FOREIGN KEY ("base_question_id") REFERENCES "base_questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_question_set_id_fkey" FOREIGN KEY ("question_set_id") REFERENCES "question_sets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_language_code_fkey" FOREIGN KEY ("language_code") REFERENCES "languages"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ehr_mappings" ADD CONSTRAINT "ehr_mappings_base_question_id_fkey" FOREIGN KEY ("base_question_id") REFERENCES "base_questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ehr_mappings" ADD CONSTRAINT "ehr_mappings_ehr_provider_code_fkey" FOREIGN KEY ("ehr_provider_code") REFERENCES "ehr_providers"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_preferred_language_fkey" FOREIGN KEY ("preferred_language") REFERENCES "languages"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_responses" ADD CONSTRAINT "patient_responses_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_responses" ADD CONSTRAINT "patient_responses_base_question_id_fkey" FOREIGN KEY ("base_question_id") REFERENCES "base_questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ehr_sync_logs" ADD CONSTRAINT "ehr_sync_logs_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ehr_sync_logs" ADD CONSTRAINT "ehr_sync_logs_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ehr_sync_logs" ADD CONSTRAINT "ehr_sync_logs_ehr_provider_code_fkey" FOREIGN KEY ("ehr_provider_code") REFERENCES "ehr_providers"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bulk_operations" ADD CONSTRAINT "bulk_operations_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ehr_mappings_cache" ADD CONSTRAINT "ehr_mappings_cache_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ehr_mappings_cache" ADD CONSTRAINT "ehr_mappings_cache_ehr_provider_code_fkey" FOREIGN KEY ("ehr_provider_code") REFERENCES "ehr_providers"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ehr_mappings_cache" ADD CONSTRAINT "ehr_mappings_cache_base_question_id_fkey" FOREIGN KEY ("base_question_id") REFERENCES "base_questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
