import userWorkoutsModel from "../../models/userWorkoutsModel.js";
const addUserWorkout = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { planId } = req.params;
    const { workoutId } = req.body;
    const id = crypto.randomUUID();

    await userWorkoutsModel.create({
      id,
      userId,
      plan: planId,
      workout: workoutId,
      completed: false,
    });

    return res.status(201).json({ message: "workout created successfully" });
  } catch (error) {
    next(error);
  }
};

export default addUserWorkout;
