import AppError from "../../errorhandlers/AppError.js";
import workoutsModel from "../../models/workoutsModel.js";
import userWorkoutsModel from "../../models/userWorkoutsModel.js";
const deleteWorkout = async (req, res, next) => {
  try {
    const { workoutIdParam } = res.locals;
    const workout = await workoutsModel.findOneAndDelete({
      _id: workoutIdParam,
    });
    if (!workout) {
      const error = new AppError(
        `workout with id ${workoutIdParam} not found`,
        404,
      );
      return next(error);
    }
    await userWorkoutsModel.deleteMany({ workout: workoutIdParam });

    return res.status(200).json({ meesage: "workout deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export default deleteWorkout;
