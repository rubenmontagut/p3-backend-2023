import { Router } from "express";
import { errorChecked } from "./utils.js";
import prisma from "./prisma-client.js";
import { RequestWithRestaurantId } from "./restaurants.js";

const router = Router();

router.get(
  "/",
  errorChecked(async (req: RequestWithRestaurantId, res) => {
    const products = await prisma.product.findMany({
      where: { restaurantId: req.restaurantId },
    });
    res.status(200).json(products);
  })
);

router.post(
  "/",
  errorChecked(async (req: RequestWithRestaurantId, res) => {
    const newProduct = await prisma.product.create({
      data: { ...req.body, restaurantId: req.restaurantId },
    });
    res.status(200).json(newProduct);
  })
);

export default router;
