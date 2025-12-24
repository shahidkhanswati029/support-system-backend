import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import errorHandler from "../middlewares/error.middleware.js";
import validate from "../middlewares/error.middleware.js";

const router = express.Router();

router.post("/register",registerValidator,validate, register);
router.post("/login", loginValidator,validate,login);

export default router;
