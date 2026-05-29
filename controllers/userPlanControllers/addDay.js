import daysModel from "../../models/daysModel.js";

const addDay = async (req, res, next) => {
  try {
    const { date, userId } = res.locals;

    const newDay = await daysModel.create({ userId, date });
    const { _id } = newDay;

    return res
      .status(201)
      .json({ message: "successfully created day plan", _id });
  } catch (error) {
    next(error);
  }
};
export default addDay;
