import userWorkoutsModel from "../../models/userWorkoutsModel.js";
import AppError from "../../errorhandlers/AppError.js";
const updateUserWorkout = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { planId } = req.params;
    const { userWorkoutId } = res.locals;

    const { completed } = req.body;

    const userWorkouts = await userWorkoutsModel.findOneAndUpdate(
      { userId, plan: planId, id: userWorkoutId },
      { completed },
      { returnDocument: "after" },
    );
    if (!userWorkouts) {
      const error = new AppError(
        "unable to update non-existing user workout",
        404,
      );
      return next(error);
    }
    return res
      .status(200)
      .json({ message: "user workouts updated successfully" });
  } catch (error) {
    next(error);
  }
};
export default updateUserWorkout;
