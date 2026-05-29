import userWorkoutsModel from "../../models/userWorkoutsModel.js";
const getUserWorkouts = async (req, res, next) => {
  try {
    const { planId, userId } = res.locals;

    const data = await userWorkoutsModel
      .find({ userId, plan: planId })
      .select({ userId: 0, plan: 0 })
      .populate({ path: "workout", select: { _id: 0 } });

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export default getUserWorkouts;
