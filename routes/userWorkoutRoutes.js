import { Router } from "express";
import {
  validateUserId,
  validatePlanId,
  validateWorkoutId,
  validateWorkoutIdParam,
} from "../middlewares/validateIds.js";
import getUserWorkouts from "../controllers/userWorkoutsControllers/getUserWorkouts.js";
import addUserWorkout from "../controllers/userWorkoutsControllers/addUserWorkouts.js";
import updateUserWorkout from "../controllers/userWorkoutsControllers/updateUserWorkout.js";
import deleteUserWorkout from "../controllers/userWorkoutsControllers/deleteUserWorkout.js";
import checkPlan from "../middlewares/checkPlan.js";

const userWorkoutRouter = Router();

userWorkoutRouter.get(
  "/plan/:planId",
  validateUserId,
  validatePlanId,
  getUserWorkouts,
);
userWorkoutRouter.post(
  "/plan/:planId",
  validateUserId,
  validatePlanId,
  validateWorkoutId,
  checkPlan,
  addUserWorkout,
);
userWorkoutRouter.patch(
  "/plan/:planId/workout/:workoutId",
  validateUserId,
  validatePlanId,
  validateWorkoutIdParam,
  updateUserWorkout,
);
userWorkoutRouter.delete(
  "/plan/:planId/workout/:workoutId",
  validateUserId,
  validatePlanId,
  validateWorkoutIdParam,
  deleteUserWorkout,
);

export default userWorkoutRouter;
