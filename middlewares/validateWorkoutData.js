import * as z from "zod";
import AppError from "../errorhandlers/AppError.js";

const validateWorkoutData = (req, res, next) => {
  try {
    const validWorkoutModel = z.object({
      routineName: z.string().trim(),
      description: z.string().trim(),
      workoutName: z.string().trim(),
      howToMake: z.string().trim(),
      sets: z.int32().min(1),
      reps: z.int32().min(1),
      restTime: z.number().nonnegative(),
      lostCaloriesAmount: z.number().nonnegative(),
      videoUrl: z.string().regex(/^https?:\/\//, {
        error: "invalid video url.",
      }),
    });
    const validWorkoutData = validWorkoutModel.safeParse(req.body);
    if (!validWorkoutData.success) {
      const error = new AppError(validWorkoutData.error);
      return next(error);
    }
    const { data } = validWorkoutData;
    res.locals.workoutData = data;
    next();
  } catch (error) {
    next(error);
  }
};
export default validateWorkoutData;
