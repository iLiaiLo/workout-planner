import authModel from "../../models/authModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const login = async (req, res, next) => {
  try {
    const existingUser = await authModel.findOne({ email });
    if (!existingUser) {
      const error = new Error("user with given email already exists");
      error.statusCode = 409;
      return next(error);
    }

    const passwordsMatched = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!passwordsMatched) {
      const error = new Error("passwords are not matched");
      error.statusCode = 401;
      return next(error);
    }
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ id: existingUser._id }, JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "Strict",
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "user logged in successfully" });
  } catch (error) {
    next(error);
  }
};

export default login;
