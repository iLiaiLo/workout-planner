import { Router } from "express";

import getAllDays from "../controllers/userPlanControllers/getAllDays.js";
import addDay from "../controllers/userPlanControllers/addDay.js";
import updateDay from "../controllers/userPlanControllers/updateDay.js";
import deleteDay from "../controllers/userPlanControllers/deleteDay.js";
import { validateUserId, validatePlanId } from "../middlewares/validateIds.js";
import validateDate from "../middlewares/validateDate.js";

const userPlanRouter = Router();

userPlanRouter.get("/", validateUserId, getAllDays);

userPlanRouter.post("/", validateUserId, validateDate, addDay);
userPlanRouter.patch(
  "/:planId",
  validateUserId,
  validatePlanId,
  validateDate,
  updateDay,
);
userPlanRouter.delete("/:planId", validateUserId, validatePlanId, deleteDay);

export default userPlanRouter;
