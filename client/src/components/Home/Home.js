import React, { useEffect } from "react";
import { Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

import CustomAppBar from "../AppBar/CustomAppBar";
import Tasks from "../Tasks/Tasks";

const Home = () => {
  return (
    <div>
      <CustomAppBar />
      <Container maxWidth="xl">
        <Grid className="board-grid" container spacing={2}>
          <Grid item xs={12}>
            <Tasks />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
