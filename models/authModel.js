import { Schema, model } from "mongoose";

const authSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "please provide valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      match: [
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/,
        "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character. No spaces allowed.",
      ],
    },
    role: {
      enum: ["admin", "user"],
      required: true,
    },
  },
  { timestamps: true },
);

const authModel = model("users", authSchema);

export default authModel;
