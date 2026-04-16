import express from "express";
import dotenv from "dotenv";
import errorHandler from "./utils/errorHandler.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import verifyToken from "./middlewares/verifyToken.js";
import userPlanRouter from "./routes/userPlanRoutes.js";
import userWorkoutRouter from "./routes/userWorkoutRoutes.js";
import workoutsRouter from "./routes/workoutRoutes.js";

import statsRouter from "./routes/statsRoutes.js";
dotenv.config();
const app = express();

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.use("/api/fitness", verifyToken);

app.use("/api/fitness/days", userPlanRouter);
app.use("/api/fitness/userWorkouts", userWorkoutRouter);
app.use("/api/fitness/workouts", workoutsRouter);
app.use("/api/fitness/stats", statsRouter);
app.use(errorHandler);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("connected to database");
    app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
  })
  .catch((e) => console.log(e));
