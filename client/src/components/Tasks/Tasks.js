import React from "react";
import { Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { fetchTasks } from "../../features/tasks/tasksSlice";
import Task from "../Task/Task";
import "./styles.css";

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
      spacing={3}
    >
      <Grid item xs={12} sm={4} sx={{ bgColor: "grey" }}>
        <Typography level="h3" className="task-status">
          To-do
        </Typography>
        {filterTasks("to-do").map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </Grid>
      <Grid item xs={12} sm={4} sx={{ bgColor: "grey" }}>
        <Typography className="task-status">In Progress</Typography>
        {filterTasks("in-progress").map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </Grid>
      <Grid item xs={12} sm={4} sx={{ bgColor: "grey" }}>
        <Typography className="task-status">Done</Typography>
        {filterTasks("completed").map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </Grid>
    </Grid>
  );
};

export default Tasks;
