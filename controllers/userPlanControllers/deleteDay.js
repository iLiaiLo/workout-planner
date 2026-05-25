import daysModel from "../../models/daysModel.js";
import userWorkoutsModel from "../../models/userWorkoutsModel.js";
import AppError from "../../errorhandlers/AppError.js";
const deleteDay = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { planId } = req.params;

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
    const deletedUserWorkouts = await userWorkoutsModel.deleteMany({
      plan: planId,
      userId,
    });
    return res.status(200).json({ message: "day plan deleted sucessfully" });
  } catch (error) {
    next(error);
  }
};
export default deleteDay;
