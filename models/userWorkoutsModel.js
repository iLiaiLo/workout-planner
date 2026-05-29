import { Schema, model } from "mongoose";
import { randomUUID } from "crypto";

const userWorkoutsSchema = new Schema(
  {
    userId: {
      ref: "users",
      type: Schema.Types.ObjectId,
      required: true,
    },
    plan: { ref: "days", type: Schema.Types.ObjectId, required: true },
    workout: { ref: "workouts", type: Schema.Types.ObjectId, required: true },
    completed: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

const userWorkoutsModel = model("user-workouts", userWorkoutsSchema);

export default userWorkoutsModel;
