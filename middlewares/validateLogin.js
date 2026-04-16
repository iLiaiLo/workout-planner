const validateLoginInput = (req, _, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error("password or email field is empty");
      error.statusCode = 400;
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default validateLoginInput;
