import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

dotenv.config();
console.log(process.env);

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/restaurants", async (req, res) => {
  try {
    const result = await prisma.restaurant.findMany({});
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ type: error.constructor.name, message: error.toString() });
  }
});

const { SERVER_PORT } = process.env;
app.listen(3000, () => {
  console.log(`Glovo API listening on ${SERVER_PORT}`);
});
