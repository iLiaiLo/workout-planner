import { Schema, model } from "mongoose";
import { randomUUID } from "crypto";
const workoutsSchema = new Schema({
  routineName: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  workoutName: { type: String, required: true, trim: true },
  howToMake: { type: String, required: true, trim: true },
  sets: { type: Number, min: 1, required: true },
  reps: { type: Number, min: 1, required: true },
  restTime: { type: Number, min: 0, required: true },
  lostCaloriesAmount: { type: Number, min: 0, required: true },
  videoUrl: {
    type: String,
    required: true,
    match: [/^https?:\/\//, "Please use a valid URL"],
  },
});

const workoutsModel = model("workouts", workoutsSchema);

export default workoutsModel;
