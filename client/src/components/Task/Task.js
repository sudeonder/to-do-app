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

import "./styles.css";
import { deleteTask } from "../../features/tasks/tasksSlice";

const Task = ({ task }) => {
  const dispatch = useDispatch();

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
        </div>
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
