import express from "express";
import {
  getTasks,
  updateTask,
  deleteTask,
  createTask,
} from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMidddleware.js";
const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.delete("/:id", authMiddleware, deleteTask);
router.put("/:id", authMiddleware, updateTask);
export default router;
