import Task from "../models/task.js";

// get all the tasks
const getTasks = async (req, res) => {
  try {
    if (req.user) {
      const username = req.user.username; // Extract username from the user object
      const tasks = await Task.find({ username }); // Filter tasks by username
      res.status(200).json(tasks);
    } else {
      console.log(req.user);
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get a task by id
const getTask = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
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
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const task = req.body;
    // drop duplicate tags and convert to lowercase
    task.tags = [...new Set(task.tags.map((tag) => tag.toLowerCase()))];
    const newTask = new Task(task);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

// delete a task by id
const deleteTask = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
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
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

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

// search tasks by title, tags, or details
const searchTasks = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const username = req.user.username; // Extract username from the user object
  const searchTerm = req.query.searchTerm || ""; // Get search term from query string
  const searchRegex = new RegExp(searchTerm, "i"); // Case-insensitive search

  try {
    const tasks = await Task.find({
      username,
      $or: [
        { title: { $regex: searchRegex } },
        { tags: { $in: searchRegex } },
        { details: { $regex: searchRegex } },
      ],
    });
    res.status(200).json(tasks); // Send found tasks in response
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error searching tasks" });
  }
};

// filter tasks by tag
const filterTasks = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const username = req.user.username; // Extract username from the user object
  const tag = req.query.tag || ""; // Get tag from query string

  try {
    const tasks = await Task.find({ username, tags: tag });
    res.status(200).json(tasks); // Send found tasks in response
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error filtering tasks" });
  }
};

const getTasksByTag = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const username = req.user.username; // Extract username from the user object
  const tag = req.params.tag || ""; // Get tag from query string

  try {
    const tasks = await Task.find({ username, tags: tag });
    res.status(200).json(tasks); // Send found tasks in response
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error filtering tasks" });
  }
};

export {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
  searchTasks,
  getTasksByTag,
};
