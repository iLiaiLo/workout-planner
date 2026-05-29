import workoutsModel from "../../models/workoutsModel.js";

const getWorkoutsData = async (_, res, next) => {
  try {
    const workoutData = await workoutsModel.aggregate([
      {
        $group: {
          _id: {
            routineName: "$routineName",
          },
          workouts: {
            $push: {
              _id: "$_id",
              workoutName: "$workoutName",
              description: "$description",
              howToMake: "$howToMake",
              sets: "$sets",
              reps: "$reps",
              restTime: "$restTime",
              lostCaloriesAmount: "$lostCaloriesAmount",
              videoUrl: "$videoUrl",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          routineName: "$_id.routineName",
          workouts: 1,
        },
      },
    ]);

    return res.status(200).json(workoutData);
  } catch (error) {
    next(error);
  }
};

export default getWorkoutsData;
