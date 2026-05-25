import AppError from "../errorhandlers/AppError.js";
import isGivenIdValidObjectId from "../utils/checkId.js";
import * as z from "zod";
const validateUserId = (req, _, next) => {
  try {
    const userId = req.user.id;

    if (!isGivenIdValidObjectId(userId)) {
      const error = new AppError("userId must be ObjectId", 400);
      return next(error);
    }

    next();
  } catch (error) {
    next(error);
  }
};
const validatePlanId = (req, _, next) => {
  try {
    const { planId } = req.params;

    if (!isGivenIdValidObjectId(planId)) {
      const error = new AppError("planId must be ObjectId", 400);
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

const validateWorkoutId = (req, _, next) => {
  try {
    const { workoutId } = req.body;

    if (!isGivenIdValidObjectId(workoutId)) {
      const error = new AppError("workoutId must be ObjectId", 400);
      return next(error);
    }

    next();
  } catch (error) {
    next(error);
  }
};

const validateUserWorkoutId = (req, res, next) => {
  try {
    const validId = z.uuid();
    const validIdData = validId.safeParse(req.params.id);
    if (!validIdData.success) {
      const error = new AppError(validIdData.error);
      return next(error);
    }
    res.locals.userWorkoutId = validIdData.data;
    next();
  } catch (error) {
    next(error);
  }
};

export {
  validateUserId,
  validatePlanId,
  validateWorkoutId,
  validateUserWorkoutId,
};
