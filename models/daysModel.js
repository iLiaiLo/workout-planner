import { Schema, model } from "mongoose";
import { randomUUID } from "crypto";
const daysSchema = new Schema(
  {
    userId: {
      ref: "users",
      type: Schema.Types.ObjectId,
      required: true,
    },
    date: {
      type: String,
      required: true,
      match: [/^\d{4}-\d{2}-\d{2}$/, "date fomat must be YYYY-MM-DD"],
    },
  },
  { timestamps: true },
);

const daysModel = model("days", daysSchema);

export default daysModel;
