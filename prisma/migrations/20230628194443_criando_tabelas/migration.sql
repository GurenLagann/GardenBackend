-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Ativo', 'Inativo', 'Ferias', 'Afastado');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3),
    "nome" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Ativo',
    "role" "Role" NOT NULL DEFAULT 'USER',
    "usuario" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "funcao" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nome" TEXT NOT NULL,
    "quantidade" INTEGER,
    "valor_unidade" DOUBLE PRECISION NOT NULL,
    "update_at" TIMESTAMP(3),
    "foto" TEXT,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Venda" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuario_id" TEXT NOT NULL,
    "valor_total" DOUBLE PRECISION NOT NULL,
    "valor_desconto" DOUBLE PRECISION DEFAULT 0,
    "valor_final" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Venda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendaProduto" (
    "id" TEXT NOT NULL,
    "produto_id" TEXT NOT NULL,
    "venda_id" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "VendaProduto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pagamento" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vendaId" TEXT NOT NULL,
    "formaPagamentoId" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "data_faturamento" TIMESTAMP(3),
    "data_pagamento" TIMESTAMP(3),

    CONSTRAINT "Pagamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormaPagamento" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL,

    CONSTRAINT "FormaPagamento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_usuario_key" ON "Usuario"("usuario");

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendaProduto" ADD CONSTRAINT "VendaProduto_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendaProduto" ADD CONSTRAINT "VendaProduto_venda_id_fkey" FOREIGN KEY ("venda_id") REFERENCES "Venda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pagamento" ADD CONSTRAINT "Pagamento_vendaId_fkey" FOREIGN KEY ("vendaId") REFERENCES "Venda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pagamento" ADD CONSTRAINT "Pagamento_formaPagamentoId_fkey" FOREIGN KEY ("formaPagamentoId") REFERENCES "FormaPagamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
