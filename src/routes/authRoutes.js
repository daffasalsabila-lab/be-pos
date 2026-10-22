import { Router } from "express";
import { login } from "../controllers/AuthController.js";
import { validate } from "../middlewares/validationMiddlewares.js";
import { loginSchema } from "../validations/auth.validation.js";

const Routes = Router();

Routes.post("/login", validate(loginSchema), login);

export default Routes;
