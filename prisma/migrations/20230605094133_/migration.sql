/*
  Warnings:

  - You are about to drop the column `orderDetailId` on the `Extra` table. All the data in the column will be lost.
  - Added the required column `productId` to the `Extra` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Extra" DROP CONSTRAINT "Extra_orderDetailId_fkey";

-- AlterTable
ALTER TABLE "Extra" DROP COLUMN "orderDetailId",
ADD COLUMN     "orderDetailsId" INTEGER,
ADD COLUMN     "productId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Extra" ADD CONSTRAINT "Extra_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Extra" ADD CONSTRAINT "Extra_orderDetailsId_fkey" FOREIGN KEY ("orderDetailsId") REFERENCES "OrderDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;
