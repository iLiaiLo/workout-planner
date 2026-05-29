import AppError from "../errorhandlers/AppError.js";
import isGivenIdValidObjectId from "../utils/checkId.js";

const validateUserId = (req, res, next) => {
  try {
    const userId = req.user.id;
    if (!isGivenIdValidObjectId(userId)) {
      const error = new AppError("userId must be ObjectId", 400);
      return next(error);
    }
    res.locals.userId = userId;

    next();
  } catch (error) {
    next(error);
  }
};

const validatePlanId = (req, res, next) => {
  try {
    const { planId } = req.params;

    if (!isGivenIdValidObjectId(planId)) {
      const error = new AppError("planId must be ObjectId", 400);
      return next(error);
    }

    res.locals.planId = planId;

    next();
  } catch (error) {
    next(error);
  }
};

const validateWorkoutId = (req, res, next) => {
  try {
    const { workoutId } = req.body;

    if (!isGivenIdValidObjectId(workoutId)) {
      const error = new AppError("workoutId must be ObjectId", 400);
      return next(error);
    }

    res.locals.workoutId = workoutId;

    next();
  } catch (error) {
    next(error);
  }
};

const validateWorkoutIdParam = (req, res, next) => {
  try {
    const { workoutId } = req.params;
    if (!isGivenIdValidObjectId(workoutId)) {
      const error = new AppError("workoutId must be ObjectId", 400);
      return next(error);
    }

    res.locals.workoutIdParam = workoutId;
    next();
  } catch (error) {
    next(error);
  }
};

export {
  validateUserId,
  validatePlanId,
  validateWorkoutId,
  validateWorkoutIdParam,
};
