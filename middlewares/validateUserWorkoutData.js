// const validateUserWorkouts = (req, _, next) => {
//   try {
//     const {
//       name,
//       description,
//       sets,
//       reps,
//       restTime,
//       lostCaloriesAmount,
//       videoUrl,
//     } = req.body;

//     if (!name || !description) {
//       const error = new Error("name or description field are not provided");
//       error.statusCode = 400;
//       return next(error);
//     }
//     if (sets < 1 || reps < 1 || restTime < 0 || lostCaloriesAmount < 0) {
//       const error = new Error(
//         "sets and reps must be greater than 1. restTime and lostCaloriesAmount must be positive numbers",
//       );
//       error.statusCode = 400;
//       return next(error);
//     }

//     const url = new URL(videoUrl);
//     if (url.protocol !== "https:") {
//       const error = new Error("video url protocol must be https");
//       error.statusCode = 400;
//       return next(error);
//     }

//     next();
//   } catch (error) {
//     next(error);
//   }
// };

const validateUpdateData = (req, _, next) => {
  try {
    const { completed } = req.body;
    if (typeof completed !== "boolean") {
      const error = new Error("completed field must be boolean");
      error.statusCode = 400;
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default validateUpdateData;
