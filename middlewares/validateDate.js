const validateDate = (req, _, next) => {
  try {
    const { date } = req.body;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      const error = new Error("date format must be YYYY-MM-DD");
      error.statusCode = 400;
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default validateDate;
