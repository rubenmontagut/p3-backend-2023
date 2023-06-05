import { Router } from "express";
import { errorChecked } from "./utils.js";
import prisma from "./prisma-client.js";
import { RequestWithRestaurantId } from "./restaurants.js";
import { RequestWithUserId } from "./users.js";

const router = Router();

router.get(
  "/",
  errorChecked(async (req: RequestWithRestaurantId, res) => {
    const orders = await prisma.order.findMany({
      where: { restaurantId: req.restaurantId },
    });
    res.status(200).json(orders);
  })
);

router.get(
  "/",
  errorChecked(async (req: RequestWithUserId, res) => {
    const orders = await prisma.order.findMany({
      where: { userId: req.userId },
    });
    res.status(200).json(orders);
  })
);

//s'hauria de verificar que el producte correspon al restaurant indicat
router.post(
  "/",
  errorChecked(async (req: RequestWithRestaurantId, res) => {
    const { userId, productId } = req.body;

    const restaurant = await prisma.restaurant.findUnique({
      where: { id: req.restaurantId },
    });

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurante no encontrado" });
    }

    const newOrder = await prisma.order.create({
      data: {
        restaurantId: req.restaurantId,
        userId: parseInt(userId),
        productId: parseInt(productId),
      },
    });

    res.status(201).json(newOrder);
  })
);

export default router;
