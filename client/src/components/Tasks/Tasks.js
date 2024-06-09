import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { fetchTasks } from "../../features/tasksSlice";
import { useNavigate } from "react-router-dom";
import Task from "../Task/Task";
import "./styles.css";
import todoIcon from "../../images/target.png";
import inProgressIcon from "../../images/favourites.png";
import doneIcon from "../../images/checked.png";
import { useState } from "react";

const Tasks = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  // if user is not logged in, redirect to sign up page

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.tasks);

  const Logout = () => {
    navigate("/signup");
  };

  // fetch posts on component mount
  useEffect(() => {
    dispatch(fetchTasks(user.token));
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
          <Task key={task._id} task={task} />
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
          <Task key={task._id} task={task} />
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
          <Task key={task._id} task={task} />
        ))}
      </Grid>
    </Grid>
  );
};

export default Tasks;
