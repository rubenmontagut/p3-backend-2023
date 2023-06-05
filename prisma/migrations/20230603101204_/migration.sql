/*
  Warnings:

  - You are about to drop the column `productId` on the `Extra` table. All the data in the column will be lost.
  - You are about to drop the `_OrderToProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `orderDetailId` to the `Extra` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Extra" DROP CONSTRAINT "Extra_productId_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToProduct" DROP CONSTRAINT "_OrderToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToProduct" DROP CONSTRAINT "_OrderToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Extra" DROP COLUMN "productId",
ADD COLUMN     "orderDetailId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_OrderToProduct";

-- CreateTable
CREATE TABLE "OrderDetails" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "OrderDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Extra" ADD CONSTRAINT "Extra_orderDetailId_fkey" FOREIGN KEY ("orderDetailId") REFERENCES "OrderDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetails" ADD CONSTRAINT "OrderDetails_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetails" ADD CONSTRAINT "OrderDetails_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
