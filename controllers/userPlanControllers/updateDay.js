import daysModel from "../../models/daysModel.js";
const updateDay = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { planId } = req.params;

    const { date } = req.body;

    const existingPlan = await daysModel.findOneAndUpdate(
      { _id: planId, userId },
      { date },
      { returnDocument: "after", runValidators: true },
    );
    if (!existingPlan) {
      const error = new Error(`dayPlan with id ${id} was not found`);
      error.statusCode = 404;
      return next(error);
    }
    return res.status(200).json({ message: "day updated successfully" });
  } catch (error) {
    next(error);
  }
};
export default updateDay;
