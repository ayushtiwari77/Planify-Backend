import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import todoRouter from "./routes/todo.routes.js";

import connectToDatabase from "./lib/database.js";

const app = express();

//config the env
dotenv.config();

const port = process.env.PORT || 5000;

//using middleware
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/todo", todoRouter);

app.listen(port, () => {
  console.log(`server connected to port ${port}`);
  connectToDatabase();
});
