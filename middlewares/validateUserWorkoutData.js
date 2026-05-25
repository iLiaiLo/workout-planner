import AppError from "../errorhandlers/AppError.js";

const validateUpdateData = (req, _, next) => {
  try {
    const { completed } = req.body;
    if (typeof completed !== "boolean") {
      const error = new Error("completed field must be boolean", 400);
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default validateUpdateData;
