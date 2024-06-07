// this file connects the App component to the root element in the HTML file

import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import store from "./app/store.js";
import App from "./App";

const rootElement = document.getElementById("root");

// Create a root and render the App component
const root = createRoot(rootElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
