import { Router } from "express";
import login from "../controllers/authControllers/login.js";
import signup from "../controllers/authControllers/signup.js";
import logout from "../controllers/authControllers/logout.js";
import validateSignUpInput from "../middlewares/validateSignUpInput.js";
import refreshToken from "../controllers/authControllers/refresh.js";
const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/signup", validateSignUpInput, signup);
authRouter.post("/logout", logout);
authRouter.post("/refresh", refreshToken);

export default authRouter;
