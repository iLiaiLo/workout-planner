import * as z from "zod";

const validateDate = (req, res, next) => {
  try {
    const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
      error: "Invalid date format. Expected YYYY-MM-DD",
    });
    const parsedDate = date.safeParse(req.body.date);

    if (!parsedDate.success) {
      const error = parsedDate.error;
      return next(error);
    }
    const { data } = parsedDate;

    res.locals.date = data;
    next();
  } catch (error) {
    next(error);
  }
};

export default validateDate;
