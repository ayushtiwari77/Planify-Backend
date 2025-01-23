import express from "express";
import {
  isCompleted,
  bringAll,
  deleteTask,
  createTask,
} from "../controllers/todo.controller.js";
import { authenticator } from "../middlewares/authenticator.js";

const router = express.Router();

router.post("/create", authenticator, createTask);
router.get("/bring", authenticator, bringAll);
router.delete("/delete/:id", authenticator, deleteTask);
router.put("/status/:id", authenticator, isCompleted);

export default router;
