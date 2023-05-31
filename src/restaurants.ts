import { Router } from "express";
import prisma from "./prisma-client.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await prisma.restaurant.findMany({});
    res.status(200).json({ restaurants: result, ok: true });
  } catch (error) {
    res
      .status(500)
      .json({ type: error.constructor.name, message: error.toString() });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (restaurant === null) {
      res.status(404).json({ error: `Restaurant with ID ${id} not found` });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res
      .status(500)
      .json({ type: error.constructor.name, message: error.toString() });
  }
});

export default router;
