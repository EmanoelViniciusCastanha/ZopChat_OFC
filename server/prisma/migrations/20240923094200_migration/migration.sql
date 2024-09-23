/*
  Warnings:

  - A unique constraint covering the columns `[id_pessoa,id_grupo]` on the table `Messages` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_pessoa,id_receptor]` on the table `Messages` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_pessoa,id_grupo]` on the table `grupos_pessoas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `pessoa` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "grupo_fk";

-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "pessoa_fk";

-- DropForeignKey
ALTER TABLE "grupos_pessoas" DROP CONSTRAINT "grupo_fk";

-- DropForeignKey
ALTER TABLE "grupos_pessoas" DROP CONSTRAINT "pessoa_fk";

-- DropForeignKey
ALTER TABLE "mensagem_grupo" DROP CONSTRAINT "pessoa_fk";

-- DropForeignKey
ALTER TABLE "mensagem_privada" DROP CONSTRAINT "pessoa_fk";

-- AlterTable
ALTER TABLE "Messages" ALTER COLUMN "id_receptor" SET DATA TYPE BIGINT,
ALTER COLUMN "id_pessoa" SET DATA TYPE BIGINT,
ALTER COLUMN "id_grupo" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "grupos_pessoas" ALTER COLUMN "id_pessoa" SET DATA TYPE BIGINT,
ALTER COLUMN "id_grupo" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "mensagem_grupo" ALTER COLUMN "id_pessoa" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "mensagem_privada" ALTER COLUMN "id_pessoa" SET DATA TYPE BIGINT;

-- CreateIndex
CREATE UNIQUE INDEX "Messages_grupo_pessoa_uq" ON "Messages"("id_pessoa", "id_grupo");

-- CreateIndex
CREATE UNIQUE INDEX "emissor_receptor_uq" ON "Messages"("id_pessoa", "id_receptor");

-- CreateIndex
CREATE UNIQUE INDEX "grupo_pessoa_uq" ON "grupos_pessoas"("id_pessoa", "id_grupo");

-- CreateIndex
CREATE UNIQUE INDEX "email_uq" ON "pessoa"("email");

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "grupo_fk" FOREIGN KEY ("id_grupo") REFERENCES "grupo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "pessoa_fk" FOREIGN KEY ("id_pessoa") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grupos_pessoas" ADD CONSTRAINT "grupo_fk" FOREIGN KEY ("id_grupo") REFERENCES "grupo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grupos_pessoas" ADD CONSTRAINT "pessoa_fk" FOREIGN KEY ("id_pessoa") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensagem_grupo" ADD CONSTRAINT "pessoa_fk" FOREIGN KEY ("id_pessoa") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensagem_privada" ADD CONSTRAINT "pessoa_fk" FOREIGN KEY ("id_pessoa") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
