import daysModel from "../../models/daysModel.js";

const addDay = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { date } = req.body;

    await daysModel.create({ userId, date });

    return res.status(201).json({ message: "successfully created day plan" });
  } catch (error) {
    next(error);
  }
};
export default addDay;
