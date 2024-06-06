import Task from "../models/task.js";

// get all the tasks
const getTasks = async (req, res) => {
  try {
    const postMessages = await Task.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get a task by id
const getTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ error: "Task not found" });
  }
};

// create a task
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

// delete a task by id
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update a task by id
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, details, tags, status, priority } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      //only the fields that are passed in the request body will be updated
      { title, details, tags, status, priority },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).send(task);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export { getTasks, getTask, createTask, deleteTask, updateTask };
