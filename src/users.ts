import { Request, Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";
import ordersRouter from "./orders.js";

const router = Router();

router.get(
  "/",
  errorChecked(async (req, res) => {
    const result = await prisma.user.findMany({});
    res.status(200).json({ users: result, ok: true });
  })
);

router.post(
  "/",
  errorChecked(async (req, res) => {
    const newUser = await prisma.user.create({ data: req.body });
    res.status(200).json({ newUser, ok: true });
  })
);

export interface RequestWithUserId extends Request {
  userId: number;
}
router.use("/:id", async (req: RequestWithUserId, res, next) => {
  const { id } = req.params;
  req.userId = Number(id);
  next();
});

router.get(
  "/:id",
  errorChecked(async (req: RequestWithUserId, res) => {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: req.userId },
    });
    res.status(200).json(user);
  })
);

router.put(
  "/:id",
  errorChecked(async (req: RequestWithUserId, res) => {
    const updatedUser = await prisma.user.update({
      where: { id: req.userId },
      data: req.body,
    });
    res.status(200).json(updatedUser);
  })
);

router.delete(
  "/:id",
  errorChecked(async (req: RequestWithUserId, res) => {
    const deletedUser = await prisma.user.delete({
      where: { id: req.userId },
    });
    res.status(200).json(deletedUser);
  })
);

router.use("/:id/orders", ordersRouter);

export default router;
