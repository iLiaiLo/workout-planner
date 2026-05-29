import AppError from "../errorhandlers/AppError.js";
import daysModel from "../models/daysModel.js";

const checkPlan = async (req, res, next) => {
  try {
    const { userId, planId } = res.locals;
    const existingPlan = await daysModel.findOne({ userId, _id: planId });
    if (!existingPlan) {
      const error = new AppError("corresponding plan not found", 404);
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default checkPlan;
