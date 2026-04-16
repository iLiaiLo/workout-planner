import userWorkoutsModel from "../../models/userWorkoutsModel.js";
import { Types } from "mongoose";
const caloriesBurnedByDay = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const objectUserId = new Types.ObjectId(userId);
    const caloriesData = await userWorkoutsModel.aggregate([
      { $match: { userId: objectUserId, completed: true } },

      {
        $lookup: {
          from: "workouts",
          localField: "workout",
          foreignField: "_id",
          as: "workoutData",
        },
      },
      { $unwind: "$workoutData" },

      {
        $lookup: {
          from: "days",
          localField: "plan",
          foreignField: "_id",
          as: "planData",
        },
      },
      { $unwind: "$planData" },

      {
        $group: {
          _id: "$planData.date",
          totalCalories: { $sum: "$workoutData.lostCaloriesAmount" },
        },
      },

      {
        $project: {
          _id: 0,
          date: "$_id",
          totalCalories: 1,
        },
      },
    ]);

    return res.status(200).json(caloriesData);
  } catch (error) {
    next(error);
  }
};

export default caloriesBurnedByDay;
