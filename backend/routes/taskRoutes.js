import express from "express";
import {
  getTasks,
  getupatedTask,
  updateTask,
  deleteTask,
  createTask,
} from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMidddleware.js";
const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.get("/:id", authMiddleware, getupatedTask);
router.delete("/:id", authMiddleware, deleteTask);
router.put("/:id", authMiddleware, updateTask);
export default router;
