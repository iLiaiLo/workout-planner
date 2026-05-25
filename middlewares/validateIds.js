import AppError from "../errorhandlers/AppError.js";
import isGivenIdValidObjectId from "../utils/checkId.js";
import * as z from "zod";
const validateUserId = (req, _, next) => {
  try {
    const userId = req.user.id;

    if (!isGivenIdValidObjectId(userId)) {
      const error = new Error("userId must be ObjectId");
      error.statusCode = 400;
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
      const error = new Error("planId must be ObjectId");
      error.statusCode = 400;
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
      const error = new Error("workoutId must be ObjectId");
      error.statusCode = 400;
      return next(error);
    }

    next();
  } catch (error) {
    next(error);
  }
};

const validateUserWorkoutId = (req, _, next) => {
  try {
    const validId = z.uuid();
    const validIdData = validId.safeParse(req.params.id);
    if (!validIdData.success) {
      const error = new AppError(validIdData.error);
      return next(error);
    }

    res.locals.id = validIdData.data.validId;
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
