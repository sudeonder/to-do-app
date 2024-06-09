import React from "react";

import { Grid, Typography, Box } from "@mui/material";

const NoTasksFound = () => {
  return (
    <Grid
      item
      xs={12}
      sx={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#f7f7f6",
        maxWidth: "100%",
        height: "600px",
        borderRadius: "8px",
        alignItems: "center",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          No tasks found
        </Typography>
        <Typography variant="body1">
          You can create a new task by clicking the button below
        </Typography>
      </Box>
    </Grid>
  );
};
export default NoTasksFound;
