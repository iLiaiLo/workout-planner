import { Router } from "express";

import getWorkoutsData from "../controllers/workoutControllers/getWorkoutsData.js";

const workoutsRouter = Router();

workoutsRouter.get("/", getWorkoutsData);

export default workoutsRouter;
