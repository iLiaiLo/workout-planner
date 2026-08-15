import AppError from "../../errorhandlers/AppError.js";
import jwt from "jsonwebtoken";
const refreshToken = (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      const error = new AppError("You are not authenticated", 401);
      return next(error);
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        const error = new AppError(err.message, 403);
        return next(error);
      }
      const newAccessToken = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: "15m" },
      );

      const newRefreshToken = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_REFRESH_KEY,
        { expiresIn: "7d" },
      );

      const options = {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      };

      return res
        .cookie("accessToken", newAccessToken, {
          ...options,
          maxAge: 15 * 60 * 1000,
        })
        .cookie("refreshToken", newRefreshToken, {
          ...options,
          maxAge: 7 * 24 * 3600 * 1000,
        })
        .json({ message: "Token refreshed successfully" });
    });
  } catch (error) {
    next(error);
  }
};
export default refreshToken;
