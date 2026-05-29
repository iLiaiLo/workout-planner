import AppError from "../../errorhandlers/AppError.js";
import workoutsModel from "../../models/workoutsModel.js";

const updateWorkout = async (req, res, next) => {
  try {
    const { workoutIdParam, workoutData } = res.locals;
    const workout = await workoutsModel.findOneAndUpdate(
      {
        _id: workoutIdParam,
      },
      workoutData,
      { returnDocument: "after", runValidators: true },
    );
    if (!workout) {
      const error = new AppError(
        `workout with id ${workoutIdParam} not found`,
        404,
      );
      return next(error);
    }

    return res.status(200).json({ message: "workout updated successfully" });
  } catch (error) {
    next(error);
  }
};

export default updateWorkout;
