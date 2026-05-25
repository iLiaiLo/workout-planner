import * as z from "zod";
import AppError from "../errorhandlers/AppError.js";

const validateSignUpInput = (req, res, next) => {
  try {
    const { email, password, confirmPassword } = req.body;

    const data = z.object({
      email: z
        .string()
        .regex("/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/", {
          error: "invalid email format",
        }),
      password: z
        .string()
        .regex("/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/", {
          error: "invalid password format",
        }),
    });
    const safeSignupData = data.safeParse({ email, password });
    if (!safeSignupData.success) {
      const error = safeSignupData.error;
      return next(error);
    }

    const { safePassword, safeEmail } = safeSignupData.data;

    if (safePassword !== confirmPassword) {
      const error = new AppError("passwords don't match", 400);
      return next(error);
    }

    res.locals.safeUserData = { safeEmail, safePassword };

    next();
  } catch (error) {
    next(error);
  }
};

export default validateSignUpInput;
