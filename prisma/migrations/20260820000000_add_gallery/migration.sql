-- CreateTable
CREATE TABLE "gallery_items" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "caption" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gallery_items_pkey" PRIMARY KEY ("id")
);
