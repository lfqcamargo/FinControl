-- AlterTable
ALTER TABLE "users" ADD COLUMN     "profilePhoto" BYTEA;

-- CreateTable
CREATE TABLE "settings_user" (
    "user_id" TEXT NOT NULL,
    "notification_phone" BOOLEAN NOT NULL DEFAULT false,
    "notification_email" BOOLEAN NOT NULL DEFAULT false,
    "notification_budgets" BOOLEAN NOT NULL DEFAULT false,
    "notification_reports" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "settings_user_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "settings_user" ADD CONSTRAINT "settings_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
