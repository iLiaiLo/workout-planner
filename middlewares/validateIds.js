import isGivenIdValidObjectId from "../utils/checkId.js";

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
    const { id } = req.params;
    const pattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
    if (!pattern.test(id)) {
      const error = new Error("user workout id must be UUID");
      error.statusCode = 400;
      return next(error);
    }
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
