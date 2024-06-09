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
import { CircularProgress } from "@mui/material";
import { Autocomplete, TextField } from "@mui/material";
import NoTasksFound from "./NoTasksFound";

const Tasks = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [selectedTags, setSelectedTags] = useState([]);

  // if user is not logged in, redirect to sign up page

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.tasks);

  const handleTagsChange = (event, value) => {
    setSelectedTags(value);
  };

  const filterTasksByTags = (data, selectedTags) => {
    if (selectedTags.length === 0) {
      return data;
    }
    return data.filter((task) => {
      return selectedTags.every((tag) => task.tags.includes(tag));
    });
  };

  // fetch posts on component mount
  useEffect(() => {
    dispatch(fetchTasks(user.token));
  }, [dispatch]);

  // filter tasks based on status
  const filterTasks = (status) => {
    return filterTasksByTags(data, selectedTags).filter(
      (task) => task.status === status
    );
  };

  return (
    // render loadingcircle if loading
    loading ? (
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Grid>
    ) : (
      // render tasks

      <Grid
        container
        justifyContent="space-between"
        alignItems="stretch"
        spacing={1}
      >
        <Grid
          item
          xs={12}
          sm={12}
          sx={{
            display: "flex",
          }}
        >
          <Autocomplete
            sx={{ width: 300, marginBottom: 2 }}
            multiple
            id="tags-outlined"
            options={data.reduce((acc, task) => [...acc, ...task.tags], [])}
            getOptionLabel={(option) => option}
            value={selectedTags}
            onChange={handleTagsChange}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="Filter by Tags"
                placeholder="Filter by Tags"
              />
            )}
          />
          <Box
            display="flex"
            justifyContent="center"
            sx={{
              marginBottom: 2,
              marginLeft: 5,
              letterSpacing: 6,
              fontFamily: "Monospace",
            }}
          >
            <Typography sx={{ fontSize: "30px" }}>
              Welcome {user.user.username}!
            </Typography>
          </Box>
        </Grid>
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
        <Grid item xs={12} sm={12}>
          {/* If no tasks render no tasks found box */}
          {filterTasks("in-progress").length === 0 &&
          filterTasks("completed").length === 0 &&
          filterTasks("to-do").length === 0 ? (
            <NoTasksFound />
          ) : null}
        </Grid>
      </Grid>
    )
  );
};

export default Tasks;
