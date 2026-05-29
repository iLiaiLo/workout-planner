import authModel from "../../models/authModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "../../errorhandlers/AppError.js";
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new AppError("password or email field is empty", 400);
      return next(error);
    }
    const existingUser = await authModel.findOne({ email });
    if (!existingUser) {
      const error = new AppError("user with given email does not exist", 409);
      return next(error);
    }

    const passwordsMatched = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!passwordsMatched) {
      const error = new AppError("passwords are not matched", 401);
      return next(error);
    }
    const JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY;
    const JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY;
    const NODE_ENV = process.env.NODE_ENV;
    const { _id, role } = existingUser;
    const accessToken = jwt.sign({ id: _id, role }, JWT_ACCESS_KEY, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign({ id: _id, role }, JWT_REFRESH_KEY, {
      expiresIn: "2d",
    });
    return res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "Strict",
        secure: NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "Strict",
        secure: NODE_ENV === "production",
        maxAge: 48 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "user logged in successfully" });
  } catch (error) {
    next(error);
  }
};

export default login;
