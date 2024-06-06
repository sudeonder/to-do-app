import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import taskRoutes from "./routes/tasks.js";

const app = express();

// middleware stack
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/tasks", taskRoutes);

// connect to MongoDB
const db_connection_url =
  "mongodb+srv://sudeonder999:fcxInJPWYrcDp1Ud@cluster0.pt9iw0x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const port = process.env.PORT || 8000;

mongoose
  .connect(db_connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(port, () => console.log(`Server running on port: ${port}`))
  )
  .catch((error) => console.log(error.message));
