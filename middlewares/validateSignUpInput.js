const validateSignUpInput = (req, _, next) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      const error = new Error("email is not valid");
      error.statusCode = 400;
      return next(error);
    }
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/;
    if (!passwordRegex.test(password)) {
      const error = new Error(
        "your password does not satisfy following criterias:Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character. No spaces allowed.",
      );
      error.statusCode = 400;
      return next(error);
    }
    if (password !== confirmPassword) {
      const error = new Error("passwords don't match");
      error.statusCode = 401;
      return next(error);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default validateSignUpInput;
