import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  CardActions,
  Button,
  CardMedia,
  Avatar,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch } from "react-redux";
import { Chip, Stack } from "@mui/material";

import "./styles.css";
import { deleteTask } from "../../features/tasksSlice";

const Task = ({ task }) => {
  const dispatch = useDispatch();

  // get user from session
  const user = JSON.parse(localStorage.getItem("profile"));

  const renderTags = () => {
    if (!task.tags || !task.tags.length) {
      return null;
    }

    const colors = ["#e8dff5", " #fce1e4", "#fcf4dd", "#ddedea", "#daeaf6"]; // Array of color codes

    return (
      <Stack className="tags" direction="row" spacing={1} mt={2}>
        {task.tags.map((tag, index) => {
          const colorIndex = index % colors.length; // Get color index based on repetition
          return (
            <Chip
              key={tag}
              label={tag}
              size="large"
              sx={{
                fontSize: "15px",
                color: "black",
                backgroundColor: colors[colorIndex],
                padding: "8px 16px",
              }} // Set background color
            />
          );
        })}
      </Stack>
    );
  };

  return (
    <Card className="task-card">
      <CardHeader
        titleTypographyProps={{ variant: "h5" }}
        title={task.title}
        avatar={
          <Avatar alt="thumbnail" src={task.selectedFile}>
            <AssignmentIcon />
          </Avatar>
        }
      />

      <CardContent>
        <div>
          <Typography variant="body2" color="textSecondary" component="p">
            {task.details}
          </Typography>
          {renderTags()}
        </div>
      </CardContent>
      <CardActions className="card-actions">
        <Button
          size="small"
          color="primary"
          onClick={() =>
            dispatch(deleteTask({ id: task._id, token: user.token }))
          }
        >
          <DeleteForeverIcon className="delete-icon" color="action" />
        </Button>
      </CardActions>
    </Card>
  );
};

export default Task;
