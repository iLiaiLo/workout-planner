import userWorkoutsModel from "../../models/userWorkoutsModel.js";

const updateUserWorkout = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { planId, id } = req.params;
    const { completed } = req.body;

    const userWorkouts = await userWorkoutsModel.findOneAndUpdate(
      { userId, plan: planId, id },
      { completed },
      { returnDocument: "after" },
    );
    if (!userWorkouts) {
      const error = new Error("unable to update non-existing user workout");
      error.statusCode = 404;
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
