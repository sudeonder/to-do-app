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
import { createTask } from "../../features/tasksSlice";
import { useNavigate } from "react-router-dom";
import { MuiChipsInput } from "mui-chips-input";

const AddTaskButton = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));

  if (!user) {
    navigate("/signin");
  }
  const [open, setOpen] = React.useState(false);

  const [chips, setChips] = React.useState([]);
  const handleTagInput = (newChips) => {
    setChips(newChips);
  };

  const dispatch = useDispatch();
  const [taskData, setTaskData] = useState({
    username: "",
    title: "",
    details: "",
    status: "to-do",
    tags: "",
    priority: "medium",
    selectedFile: "",
  });

  const handleAddTask = () => {
    setOpen(true);
  };

  const handleAddTaskClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // dispatch action to add task
    const newTask = { ...taskData, username: user.user.username, tags: chips };
    dispatch(createTask(newTask));
    clearForm();
    setOpen(false);
  };

  const clearForm = () => {
    // set chips to empty array
    setChips([]);
    setTaskData({
      username: "",
      title: "",
      details: "",
      status: "to-do",
      tags: "",
      priority: "medium",
      //generate random string for user id
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
              onChange={(e) =>
                setTaskData({ ...taskData, title: e.target.value })
              }
            />
            <TextField
              label="Details"
              variant="outlined"
              fullWidth
              margin="normal"
              name="details"
              required={false}
              value={taskData.details}
              onChange={(e) =>
                setTaskData({ ...taskData, details: e.target.value })
              }
            />
            <MuiChipsInput
              label="Tags"
              autoFocus
              value={chips}
              onChange={handleTagInput}
              fullWidth
              variant="outlined"
            />
            <FormControl sx={{ mt: 2, minWidth: 400 }}>
              <InputLabel htmlFor="taskStatus">Status</InputLabel>
              <Select
                autoFocus
                value={taskData.status}
                onChange={(e) =>
                  setTaskData({ ...taskData, status: e.target.value })
                }
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
                onChange={(e) =>
                  setTaskData({ ...taskData, priority: e.target.value })
                }
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
