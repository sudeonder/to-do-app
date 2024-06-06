import express from "express";

import { getTasks, createTask, deleteTask } from "../controllers/tasks.js";

const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.delete("/:id", deleteTask);

export default router;
