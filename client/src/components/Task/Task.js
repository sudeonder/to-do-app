import React from "react";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";

import "./styles.css";

const Task = ({ task }) => {
  console.log(task);

  return (
    <Card className="task-card">
      <CardHeader title={task.title} subheader={task.status} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {task.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Task;
