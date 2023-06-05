import express from "express";
import { ErrorRequestHandler } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import restaurantsRouter from "./restaurants.js";
import productsRouter from "./products.js";
import usersRouter from "./users.js";
import { defaultErrorHandler } from "./utils.js";

dotenv.config();
console.log(process.env);

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/restaurants", restaurantsRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
// app.use("/extras", extrasRouter);
// app.use("/orders", ordersRouter);

app.get("/err1", (req, res) => {
  throw new Error("Error 1 miau");
});
app.get("/err1", async (req, res) => {
  throw new Error("Error 2");
});

app.use(((err, req, res, next) => {
  console.error("Soy un intermediario ", err);
  next(err);
}) as ErrorRequestHandler);

app.use(defaultErrorHandler);

const { SERVER_PORT } = process.env;
app.listen(3000, () => {
  console.log(`Glovo API listening on ${SERVER_PORT}`);
});
