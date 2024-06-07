import React from "react";
import { Container, Grid, StyledEngineProvider } from "@mui/material";
import CustomAppBar from "./components/AppBar/CustomAppBar"; // Import the CustomAppBar component

import "./styles.css";
import Tasks from "./components/Tasks/Tasks";

export default function App() {
  return (
    <StyledEngineProvider injectFirst>
      <CustomAppBar />
      <Container maxWidth="xl">
        <Grid className="board-grid" container spacing={2}>
          <Grid item xs={12}>
            <Tasks />
          </Grid>
        </Grid>
      </Container>
    </StyledEngineProvider>
  );
}
