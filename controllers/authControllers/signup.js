import bcrypt from "bcrypt";
import authModel from "../../models/authModel.js";
import jwt from "jsonwebtoken";
const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await authModel.findOne({ email });
    if (existingUser) {
      const error = new Error(
        `unable to sign up. user with email ${email} already exists`,
      );
      error.statusCode = 409;
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await authModel.create({ email, password: hashedPassword });

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

    const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "Strict",
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({ message: "user created successfully" });
  } catch (error) {
    next(error);
  }
};

export default signup;
