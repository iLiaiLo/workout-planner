import workoutsModel from "../../models/workoutsModel.js";

const addWorkout = async (req, res, next) => {
  try {
    const { workoutData } = res.locals;
    const workout = await workoutsModel.create(workoutData);
    const { _id } = workout;
    return res
      .status(201)
      .json({ message: "workout created successfully", _id });
  } catch (error) {
    next(error);
  }
};
export default addWorkout;
