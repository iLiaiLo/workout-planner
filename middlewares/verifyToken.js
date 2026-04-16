import jwt from "jsonwebtoken";
const verifyToken = (req, _, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      const error = new Error("no token for authentication");
      return next(error);
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        let message = "Authentication failed";
        if (err.name === "TokenExpiredError") {
          message = "Token has expired, please log in again";
        } else if (err.name === "JsonWebTokenError") {
          message = "Token is invalid";
        }
        const error = new Error(message);
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
