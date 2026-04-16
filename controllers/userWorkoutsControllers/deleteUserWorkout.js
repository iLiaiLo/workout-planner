import userWorkoutsModel from "../../models/userWorkoutsModel.js";

const deleteUserWorkout = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { planId, id } = req.params;

    const userWorkout = await userWorkoutsModel.findOneAndDelete({
      userId,
      plan: planId,
      id,
    });
    if (!userWorkout) {
      const error = new Error("unable to delete non existing user workout");
      error.statusCode = 404;
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
