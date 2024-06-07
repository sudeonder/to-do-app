import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import FileBase64 from "react-file-base64";
import { createTask } from "../../features/tasks/tasksSlice";

const AddTaskButton = () => {
  const dispatch = useDispatch();
  const [taskData, setTaskData] = useState({
    title: "",
    details: "",
    status: "to-do",
    tags: "",
    priority: "medium",
    selectedFile: "",
    //generate random string for user id
    userId: Math.random().toString(36).substring(7),
  });

  const [open, setOpen] = React.useState(false);

  const handleAddTask = () => {
    setOpen(true);
  };

  const handleAddTaskClose = () => {
    setOpen(false);
  };

  const handleTitleChange = (event) => {
    setTaskData({ ...taskData, title: event.target.value });
  };

  const handlePriorityChange = (event) => {
    setTaskData({ ...taskData, priority: event.target.value });
  };

  const handleStatusChange = (event) => {
    setTaskData({ ...taskData, status: event.target.value });
  };

  const handleDetailsChange = (event) => {
    setTaskData({ ...taskData, details: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // dispatch action to add task
    dispatch(createTask(taskData));
    clearForm();
    setOpen(false);
  };

  const clearForm = () => {
    setTaskData({
      title: "",
      details: "",
      status: "to-do",
      tags: "",
      priority: "medium",
      //generate random string for user id
      userId: Math.random().toString(36).substring(7),
    });
  };

  return (
    <Box sx={{ flexGrow: 29, display: { ml: 5 } }}>
      <Button
        className="add-task-button"
        onClick={handleAddTask}
        sx={{ my: 2, display: "block" }}
      >
        + Add Task
      </Button>
      <Dialog maxWidth="xl" open={open} onClose={handleAddTaskClose}>
        <DialogTitle>New Task</DialogTitle>
        <DialogContent>
          <DialogContentText>Add new Task</DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              name="title"
              required
              value={taskData.title}
              onChange={handleTitleChange}
            />
            <TextField
              label="Details"
              variant="outlined"
              fullWidth
              margin="normal"
              name="details"
              required={false}
              value={taskData.details}
              onChange={handleDetailsChange}
            />
            <FormControl sx={{ mt: 2, minWidth: 400 }}>
              <InputLabel htmlFor="taskStatus">Status</InputLabel>
              <Select
                autoFocus
                value={taskData.status}
                onChange={handleStatusChange}
                label="status"
                inputProps={{
                  name: "status",
                  id: "status",
                }}
              >
                <MenuItem value="to-do">to-do</MenuItem>
                <MenuItem value="in-progress">in progress</MenuItem>
                <MenuItem value="completed">completed</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ mt: 2, minWidth: 400 }}>
              <InputLabel htmlFor="taskPriority">Priority</InputLabel>
              <Select
                value={taskData.priority}
                onChange={handlePriorityChange}
                label="Priority"
                inputProps={{
                  name: "priority",
                  id: "taskPriority",
                }}
              >
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>
            <div className="img-button">
              <FileBase64
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setTaskData({ ...taskData, selectedFile: base64 })
                }
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            className="button-submit"
            variant="container"
            color="primary"
            size="large"
            type="submit"
            onClick={handleSubmit}
          >
            + Add Task
          </Button>
          <Button onClick={handleAddTaskClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddTaskButton;
