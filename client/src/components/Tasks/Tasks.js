import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { fetchTasks } from "../../features/tasks/tasksSlice";
import Task from "../Task/Task";
import "./styles.css";
import todoIcon from "../../images/target.png";
import inProgressIcon from "../../images/favourites.png";
import doneIcon from "../../images/checked.png";

const Tasks = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.tasks);

  // fetch posts on component mount
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // filter tasks based on status
  const filterTasks = (status) => {
    return data.filter((task) => task.status === status);
  };

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="stretch"
      spacing={1}
    >
      <Grid className="card-grid" item xs={12} sm={3.9}>
        <Box display="flex" alignItems="center">
          <img className="status-icon" src={todoIcon} alt="icon" />
          <Typography level="h3" className="task-status">
            To-do
          </Typography>
        </Box>
        {filterTasks("to-do").map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </Grid>
      <Grid className="card-grid" item xs={12} sm={3.9}>
        <Box display="flex" alignItems="center">
          <img className="status-icon" src={inProgressIcon} alt="icon" />
          <Typography level="h3" className="task-status">
            In Progress
          </Typography>
        </Box>
        {filterTasks("in-progress").map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </Grid>
      <Grid className="card-grid" item xs={12} sm={3.9}>
        <Box display="flex" alignItems="center">
          <img className="status-icon" src={doneIcon} alt="icon" />
          <Typography level="h3" className="task-status">
            Done
          </Typography>
        </Box>
        {filterTasks("completed").map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </Grid>
    </Grid>
  );
};

export default Tasks;
