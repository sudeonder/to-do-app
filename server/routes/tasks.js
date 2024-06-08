import express from "express";

import {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
} from "../controllers/tasks.js";

import { userVerification } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getTasks);
router.get("/:id", getTask);
router.post("/", createTask);
router.delete("/:id", deleteTask);
router.put("/:id", updateTask);

export default router;
