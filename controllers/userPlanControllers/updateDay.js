import daysModel from "../../models/daysModel.js";
import AppError from "../../errorhandlers/AppError.js";
const updateDay = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { planId } = res.locals;

    const { date } = res.locals;

    const existingPlan = await daysModel.findOneAndUpdate(
      { _id: planId, userId },
      { date },
      { returnDocument: "after", runValidators: true },
    );
    if (!existingPlan) {
      const error = new AppError(`dayPlan with id ${id} was not found`, 404);
      return next(error);
    }
    return res.status(200).json({ message: "day updated successfully" });
  } catch (error) {
    next(error);
  }
};
export default updateDay;
