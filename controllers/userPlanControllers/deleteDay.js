import daysModel from "../../models/daysModel.js";
import userWorkoutsModel from "../../models/userWorkoutsModel.js";
const deleteDay = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { planId } = req.params;

    const existingPlan = await daysModel.findOneAndDelete({
      _id: planId,
      userId,
    });
    if (!existingPlan) {
      const error = new Error(`dayPlan with id ${id} was not found`);
      error.statusCode = 404;
      return next(error);
    }
    const deletedUserWorkouts = await userWorkoutsModel.deleteMany({
      plan: planId,
      userId,
    });
    if (!deletedUserWorkouts.deletedCount) {
      const error = new Error(
        "corresponding workouts of day plan were not deleted",
      );
      error.statusCode = 400;
      return next(error);
    }
    return res.status(200).json({ message: "day plan deleted sucessfully" });
  } catch (error) {
    next(error);
  }
};
export default deleteDay;
