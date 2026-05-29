import userWorkoutsModel from "../../models/userWorkoutsModel.js";
import AppError from "../../errorhandlers/AppError.js";
const updateUserWorkout = async (req, res, next) => {
  try {
    const { planId, workoutIdParam, userId } = res.locals;
    const { idParam } = res.locals;

    const { completed } = req.body;
    if (typeof completed !== "boolean") {
      const error = new Error("completed field must be boolean", 400);
      return next(error);
    }

    const userWorkouts = await userWorkoutsModel.findOneAndUpdate(
      { userId, plan: planId, _id: workoutIdParam },
      { completed },
      { returnDocument: "after", runValidators: true },
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
