import daysModel from "../../models/daysModel.js";

const getAllDays = async (req, res, next) => {
  try {
    const userId = res.locals.userId;

    const daysData = await daysModel
      .find({ userId })
      .select({ _id: 1, date: 1 });
    return res.status(200).json(daysData);
  } catch (error) {
    next(error);
  }
};
export default getAllDays;
