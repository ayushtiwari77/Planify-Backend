import express from "express";
import {
  isCompleted,
  bringAll,
  deleteTask,
  createTask,
} from "../controllers/todo.controller.js";

const router = express.Router();

router.post("/create", createTask);
router.get("/bring", bringAll);
router.delete("/delete/:id", deleteTask);
router.put("/status/:id", isCompleted);

export default router;
