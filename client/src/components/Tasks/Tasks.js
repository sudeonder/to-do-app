import React from "react";
import { Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { fetchTasks } from "../../features/tasks/tasksSlice";

const Tasks = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.tasks);

  // fetch posts on component mount
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="stretch"
      spacing={3}
    >
      <Grid item xs={12} sm={4} sx={{ bgColor: "grey" }}>
        <Typography>To-do </Typography>
      </Grid>
      <Grid item xs={12} sm={4} sx={{ bgColor: "grey" }}>
        <Typography>In Progress</Typography>
      </Grid>
      <Grid item xs={12} sm={4} sx={{ bgColor: "grey" }}>
        <Typography>Done</Typography>
      </Grid>
    </Grid>
  );
};

export default Tasks;
