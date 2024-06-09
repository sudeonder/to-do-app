import React from "react";
import { StyledEngineProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./styles.css";
import Home from "./components/Home/Home";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import { Provider } from "react-redux";
import store from "./app/store";

export default function App() {
  return (
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/board" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </StyledEngineProvider>
  );
}
