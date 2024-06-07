import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch } from "react-redux";

import "./styles.css";
import { deleteTask } from "../../features/tasks/tasksSlice";

const Task = ({ task }) => {
  const dispatch = useDispatch();

  return (
    <Card className="task-card">
      <CardHeader title={task.title} subheader={task.status} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {task.description}
        </Typography>
      </CardContent>
      <CardActions className="card-actions">
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(deleteTask(task._id))}
        >
          <DeleteForeverIcon className="delete-icon" color="action" />
        </Button>
      </CardActions>
    </Card>
  );
};

export default Task;
