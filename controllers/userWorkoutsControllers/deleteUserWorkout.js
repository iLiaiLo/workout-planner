import userWorkoutsModel from "../../models/userWorkoutsModel.js";
import AppError from "../../errorhandlers/AppError.js";
const deleteUserWorkout = async (req, res, next) => {
  try {
    const { planId, userId, workoutIdParam } = res.locals;

    const userWorkout = await userWorkoutsModel.findOneAndDelete({
      userId,
      plan: planId,
      _id: workoutIdParam,
    });
    if (!userWorkout) {
      const error = new AppError(
        "unable to delete non existing user workout",
        404,
      );
      return next(error);
    }

    return res
      .status(200)
      .json({ message: "userWorkout deleted successfully" });
  } catch (error) {
    next(error);
  }
};
export default deleteUserWorkout;
