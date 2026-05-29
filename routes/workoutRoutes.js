import { Router } from "express";

import getWorkoutsData from "../controllers/workoutControllers/getWorkoutsData.js";
import addWorkout from "../controllers/workoutControllers/addWorkout.js";
import updateWorkout from "../controllers/workoutControllers/updateWorkout.js";
import deleteWorkout from "../controllers/workoutControllers/deleteWorkout.js";
import authorize from "../middlewares/authorize.js";
import validateWorkoutData from "../middlewares/validateWorkoutData.js";
import { validateWorkoutIdParam } from "../middlewares/validateIds.js";
const workoutsRouter = Router();

workoutsRouter.get("/", authorize(["user", "admin"]), getWorkoutsData);
workoutsRouter.post("/", authorize(["admin"]), validateWorkoutData, addWorkout);
workoutsRouter.put(
  "/:workoutId",
  authorize(["admin"]),
  validateWorkoutIdParam,
  validateWorkoutData,
  updateWorkout,
);
workoutsRouter.delete(
  "/:workoutId",
  authorize(["admin"]),
  validateWorkoutIdParam,
  deleteWorkout,
);
export default workoutsRouter;
