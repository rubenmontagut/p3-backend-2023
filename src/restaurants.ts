import { Request, Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";
import productsRouter from "./products.js";
import ordersRouter from "./orders.js";

const router = Router();

router.get(
  "/",
  errorChecked(async (req, res) => {
    const result = await prisma.restaurant.findMany({});
    res.status(200).json({ restaurants: result, ok: true });
  })
);

router.post(
  "/",
  errorChecked(async (req, res) => {
    const newRestaurant = await prisma.restaurant.create({ data: req.body });
    res.status(200).json({ newRestaurant, ok: true });
  })
);

export interface RequestWithRestaurantId extends Request {
  restaurantId: number;
}
router.use("/:id", async (req: RequestWithRestaurantId, res, next) => {
  const { id } = req.params;
  req.restaurantId = Number(id);
  next();
});

router.get(
  "/:id",
  errorChecked(async (req: RequestWithRestaurantId, res) => {
    const restaurant = await prisma.restaurant.findUniqueOrThrow({
      where: { id: req.restaurantId },
    });
    res.status(200).json(restaurant);
  })
);

router.put(
  "/:id",
  errorChecked(async (req: RequestWithRestaurantId, res) => {
    const updatedRestaurant = await prisma.restaurant.update({
      where: { id: req.restaurantId },
      data: req.body,
    });
    res.status(200).json(updatedRestaurant);
  })
);

router.delete(
  "/:id",
  errorChecked(async (req: RequestWithRestaurantId, res) => {
    const deletedRestaurant = await prisma.restaurant.delete({
      where: { id: req.restaurantId },
    });
    res.status(200).json(deletedRestaurant);
  })
);

router.use("/:id/products", productsRouter);
router.use("/:id/orders", ordersRouter);

export default router;
