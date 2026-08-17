-- CreateTable
CREATE TABLE "donations" (
    "id" SERIAL NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'nedarim_plus',
    "transaction_id" TEXT,
    "keva_id" TEXT,
    "is_recurring_setup" BOOLEAN NOT NULL DEFAULT false,
    "client_name" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,
    "zeout" TEXT,
    "amount" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'ILS',
    "category" TEXT,
    "comments" TEXT,
    "installments" INTEGER,
    "transaction_time" TIMESTAMP(3),
    "confirmation_code" TEXT,
    "last4" TEXT,
    "card_expiry" TEXT,
    "source_channel" TEXT,
    "receipt_url" TEXT,
    "receipt_doc_num" TEXT,
    "raw_payload" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "donations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "webhook_logs" (
    "id" SERIAL NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'nedarim_plus',
    "ip" TEXT,
    "payload" JSONB NOT NULL,
    "processed" BOOLEAN NOT NULL DEFAULT false,
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "webhook_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "donations_transaction_id_key" ON "donations"("transaction_id");
