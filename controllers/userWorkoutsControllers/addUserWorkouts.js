import userWorkoutsModel from "../../models/userWorkoutsModel.js";
const addUserWorkout = async (_, res, next) => {
  try {
    const { planId, userId, workoutId } = res.locals;

    const newUserWorkout = await userWorkoutsModel.create({
      userId,
      plan: planId,
      workout: workoutId,
      completed: false,
    });

    const { _id } = newUserWorkout;

    return res.status(201).json({
      message: "workout created successfully",
      _id,
    });
  } catch (error) {
    next(error);
  }
};

export default addUserWorkout;
