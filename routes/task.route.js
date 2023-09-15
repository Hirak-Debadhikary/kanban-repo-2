import express from "express";

// Import Task controllers
import {
  addNewTask,
  deleteTask,
  getTask,
  updateStatus,
  updateTask,
} from "../controllers/task.controller.js";

const router = express.Router();

// Task Routes
router.post("/add-todo", addNewTask);
router.get("/get-todo", getTask);
router.delete("/delete-todo/:id", deleteTask);
router.put("/update-todo/:id", updateTask);
router.put("/todo/:id/status", updateStatus);

export default router;
