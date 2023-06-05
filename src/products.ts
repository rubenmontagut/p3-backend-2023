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

//s'hauria d'afegir una autorització per a verificar que es un producte del restaurant que crida a la API
router.delete(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await prisma.product.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json(deletedProduct);
  })
);

export default router;
