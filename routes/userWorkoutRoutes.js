import { Router } from "express";
import {
  validatePlanId,
  validateUserId,
  validateUserWorkoutId,
  validateWorkoutId,
} from "../middlewares/validateIds.js";
import getUserWorkouts from "../controllers/userWorkoutsControllers/getUserWorkouts.js";
import addUserWorkout from "../controllers/userWorkoutsControllers/addUserWorkouts.js";
import updateUserWorkout from "../controllers/userWorkoutsControllers/updateUserWorkout.js";
import deleteUserWorkout from "../controllers/userWorkoutsControllers/deleteUserWorkout.js";
import validateUpdateData from "../middlewares/validateUserWorkoutData.js";

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
  addUserWorkout,
);
userWorkoutRouter.patch(
  "/plan/:planId/workout/:id",
  validateUserId,
  validatePlanId,
  validateUserWorkoutId,
  validateUpdateData,
  updateUserWorkout,
);
userWorkoutRouter.delete(
  "/plan/:planId/workout/:id",
  validateUserId,
  validatePlanId,
  validateUserWorkoutId,
  deleteUserWorkout,
);

export default userWorkoutRouter;
