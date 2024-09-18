/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `pessoa` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "pessoa_email_key" ON "pessoa"("email");
