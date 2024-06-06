import Task from "../models/task.js";

const getTasks = async (req, res) => {
  try {
    const postMessages = await Task.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const task = req.body;
    const newTask = new Task(task);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export { getTasks, createTask };
