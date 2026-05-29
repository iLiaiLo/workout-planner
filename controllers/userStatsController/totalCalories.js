import userWorkoutsModel from "../../models/userWorkoutsModel.js";
import { Types } from "mongoose";

const totalCalories = async (_, res, next) => {
  try {
    const userId = res.locals.userId;
    const objectUserId = new Types.ObjectId(userId);

    const totalCalories = await userWorkoutsModel.aggregate([
      { $match: { userId: objectUserId, completed: true } },

      {
        $lookup: {
          from: "workouts",
          localField: "workout",
          foreignField: "_id",
          as: "workoutDetails",
        },
      },
      { $unwind: "$workoutDetails" },
      {
        $group: {
          _id: null,
          totalCalories: { $sum: "$workoutDetails.lostCaloriesAmount" },
        },
      },
      {
        $project: {
          _id: 0,
          totalCalories: 1,
        },
      },
    ]);

    const result = totalCalories[0];
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export default totalCalories;
