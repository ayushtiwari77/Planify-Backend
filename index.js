import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import todoRouter from "./routes/todo.routes.js";

import connectToDatabase from "./lib/database.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();

//config the env
dotenv.config();

const port = process.env.PORT || 5000;

//using middleware is healty for us
app.use(morgan("dev"));
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/todo", todoRouter);

app.listen(port, () => {
  console.log(`server connected to port ${port}`);
  connectToDatabase();
});
