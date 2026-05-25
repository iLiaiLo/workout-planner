import jwt from "jsonwebtoken";
import AppError from "../errorhandlers/AppError.js";
const verifyToken = (req, _, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      const error = new AppError("no token for authentication", 401);
      return next(error);
    }
    jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
      if (err) {
        let message = "Authentication failed";
        if (err.name === "TokenExpiredError") {
          message = "Token has expired, please log in again";
        } else if (err.name === "JsonWebTokenError") {
          message = "Token is invalid";
        }
        const error = new AppError(message, 401);
        return next(error);
      }
      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
};

export default verifyToken;
