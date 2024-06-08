import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import taskRoutes from "./routes/tasks.js";
import authRoutes from "./routes/auth.js";
import { config } from "dotenv";

config();

const app = express();

// middleware stack
app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);

// connect to MongoDB

const port = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(port, () => console.log(`Server running on port: ${port}`))
  )
  .catch((error) => console.log(error.message));
