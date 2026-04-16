import { Router } from "express";
import caloriesBurnedByDay from "../controllers/userStatsController/caloriesBurnedByDay.js";
import totalCalories from "../controllers/userStatsController/totalCalories.js";
import { validateUserId } from "../middlewares/validateIds.js";

const statsRouter = Router();

statsRouter.get("/caloriesBurnedByDay", validateUserId, caloriesBurnedByDay);
statsRouter.get("/totalCalories", validateUserId, totalCalories);

export default statsRouter;
