-- CreateTable
CREATE TABLE "Messages" (
    "id" BIGSERIAL NOT NULL,
    "id_receptor" INTEGER,
    "data_cadastro" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_pessoa" INTEGER NOT NULL,
    "id_grupo" INTEGER,

    CONSTRAINT "Messages_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grupo" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR NOT NULL DEFAULT 200,
    "descricao" TEXT,

    CONSTRAINT "grupo_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grupos_pessoas" (
    "id" SERIAL NOT NULL,
    "data_cadastro" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_pessoa" INTEGER NOT NULL,
    "id_grupo" INTEGER NOT NULL,

    CONSTRAINT "grupos_pessoas_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mensagem_grupo" (
    "id" BIGSERIAL NOT NULL,
    "mensagem" TEXT NOT NULL,
    "data_cadastro" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_Messages" BIGINT NOT NULL,
    "id_pessoa" INTEGER NOT NULL,

    CONSTRAINT "mensagem_grupo_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mensagem_privada" (
    "id" BIGSERIAL NOT NULL,
    "mensagem" TEXT NOT NULL,
    "data_cadastro" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_Messages" BIGINT NOT NULL,
    "id_pessoa" INTEGER NOT NULL,

    CONSTRAINT "mensagem_privada_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pessoa" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR NOT NULL DEFAULT 200,
    "email" VARCHAR NOT NULL DEFAULT 255,
    "senha" VARCHAR NOT NULL,
    "cpf" VARCHAR NOT NULL DEFAULT 11,
    "data_cadastro" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pessoa_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cpf_uq" ON "pessoa"("cpf");

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "grupo_fk" FOREIGN KEY ("id_grupo") REFERENCES "grupo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "pessoa_fk" FOREIGN KEY ("id_pessoa") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grupos_pessoas" ADD CONSTRAINT "grupo_fk" FOREIGN KEY ("id_grupo") REFERENCES "grupo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grupos_pessoas" ADD CONSTRAINT "pessoa_fk" FOREIGN KEY ("id_pessoa") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensagem_grupo" ADD CONSTRAINT "Messages_fk" FOREIGN KEY ("id_Messages") REFERENCES "Messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensagem_grupo" ADD CONSTRAINT "pessoa_fk" FOREIGN KEY ("id_pessoa") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensagem_privada" ADD CONSTRAINT "Messages_fk" FOREIGN KEY ("id_Messages") REFERENCES "Messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensagem_privada" ADD CONSTRAINT "pessoa_fk" FOREIGN KEY ("id_pessoa") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

