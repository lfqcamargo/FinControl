/*
  Warnings:

  - You are about to drop the `settings_user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "settings_user" DROP CONSTRAINT "settings_user_user_id_fkey";

-- DropTable
DROP TABLE "settings_user";

-- CreateTable
CREATE TABLE "preferences" (
    "user_id" TEXT NOT NULL,
    "notification_phone" BOOLEAN NOT NULL DEFAULT false,
    "notification_email" BOOLEAN NOT NULL DEFAULT false,
    "notification_budgets" BOOLEAN NOT NULL DEFAULT false,
    "notification_reports" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "preferences_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "preferences" ADD CONSTRAINT "preferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
