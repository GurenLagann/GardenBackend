-- CreateTable
CREATE TABLE "Sales" (
    "id" TEXT NOT NULL,
    "total_value" DOUBLE PRECISION NOT NULL,
    "discont_value" DOUBLE PRECISION NOT NULL,
    "final_value" DOUBLE PRECISION NOT NULL,
    "userId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesProducts" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "salesId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SalesProducts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesProducts" ADD CONSTRAINT "SalesProducts_salesId_fkey" FOREIGN KEY ("salesId") REFERENCES "Sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesProducts" ADD CONSTRAINT "SalesProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
