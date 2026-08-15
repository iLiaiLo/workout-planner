import bcrypt from "bcrypt";
import authModel from "../../models/authModel.js";
import jwt from "jsonwebtoken";
import AppError from "../../errorhandlers/AppError.js";
const signup = async (req, res, next) => {
  try {
    const { email, password } = res.locals.safeUserData;

    const existingUser = await authModel.findOne({ email });
    if (existingUser) {
      const error = new AppError(
        `unable to sign up. user with email ${email} already exists`,
        409,
      );
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const role = email === process.env.ADMIN_EMAIL ? "admin" : "user";

    const user = await authModel.create({
      email,
      password: hashedPassword,
      role,
    });

    const JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY;
    const JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY;

    const accessToken = jwt.sign({ id: user._id, role }, JWT_ACCESS_KEY, {
      expiresIn: "15m",
      algorithm: "HS256",
    });

    const refreshToken = jwt.sign({ id: user._id, role }, JWT_REFRESH_KEY, {
      expiresIn: "7d",
      algorithm: "HS256",
    });

    const options = {
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
    };

    return res
      .cookie("accessToken", accessToken, {
        ...options,
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        ...options,
        maxAge: 7 * 60 * 3600 * 1000,
      })
      .status(201)
      .json({ message: "user created successfully" });
  } catch (error) {
    next(error);
  }
};

export default signup;
