import mongoose from "mongoose";

// Create a schema for tasks
const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    lowercase: true,
    maxLength: 200,
  },
  userId: {
    type: String,
    required: true,
  },
  tags: [],
  selectedFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  status: {
    type: String,
    required: true,
    enum: ["in-progress", "completed", "to-do"],
    default: "to-do",
  },
  priority: {
    type: String,
    required: true,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
});

// Compile model from schema
const Task = mongoose.model("Task", taskSchema);

export default Task;
