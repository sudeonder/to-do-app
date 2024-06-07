import React from "react";
import { StyledEngineProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./styles.css";
import Home from "./components/Home/Home";
import SignIn from "./components/Auth/SignIn";

export default function App() {
  return (
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/board" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </StyledEngineProvider>
  );
}
