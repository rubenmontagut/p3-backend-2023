import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env);

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", async (req, res) => {
  res.status(200).send("hi!");
});

const { SERVER_PORT } = process.env;
app.listen(3000, () => {
  console.log(`Glovo API listening on ${SERVER_PORT}`);
});
