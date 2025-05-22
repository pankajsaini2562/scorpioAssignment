import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "../routes/userRoutes.js";
import taskroutes from "../routes/taskRoutes.js";
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log(error);
  });
app.use("/api/user", userRoutes);
app.use("/api/task", taskroutes);
