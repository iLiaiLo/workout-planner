import daysModel from "../../models/daysModel.js";
import userWorkoutsModel from "../../models/userWorkoutsModel.js";
import AppError from "../../errorhandlers/AppError.js";
const deleteDay = async (req, res, next) => {
  try {
    const { planId, userId } = res.locals;

    const existingPlan = await daysModel.findOneAndDelete({
      _id: planId,
      userId,
    });
    if (!existingPlan) {
      const error = new AppError(
        `dayPlan with id ${planId} was not found`,
        404,
      );
      return next(error);
    }

    const { _id } = existingPlan;
    await userWorkoutsModel.deleteMany({
      plan: _id,
      userId,
    });
    return res.status(200).json({ message: "day plan deleted sucessfully." });
  } catch (error) {
    next(error);
  }
};
export default deleteDay;
