import * as z from "zod";

const validateDate = (req, _, next) => {
  try {
    const date = z.string().regex("/^\d{4}-\d{2}-\d{2}$/", {
      message: "Invalid date format. Expected YYYY-MM-DD",
    });
    const safeDate = date.safeParse(req.body.date);
    if (!safeDate.success) {
      const error = safeDate.error;
      return next(error);
    }
    const { data } = safeDate;
    res.locals.date = data;
    next();
  } catch (error) {
    next(error);
  }
};

export default validateDate;
