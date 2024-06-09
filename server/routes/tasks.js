import express from "express";

import {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
  searchTasks,
  getTasksByTag,
} from "../controllers/tasks.js";

import { userVerification } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", userVerification, getTasks);
router.get("/filter", userVerification, getTasksByTag);
router.get("/search", userVerification, searchTasks);
router.get("/:id", userVerification, getTask);
router.post("/", userVerification, createTask);
router.delete("/:id", userVerification, deleteTask);
router.put("/:id", userVerification, updateTask);

export default router;
