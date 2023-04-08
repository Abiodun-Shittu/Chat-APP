import express, { Router } from "express";
import { createUser } from "../controllers/userController";
import { validateUser } from "../middlewares/userMiddleware";
import { validateRequiredParams } from "../middlewares/validatorMiddleware";

const router = express.Router();

router
	.route("/")
	.post(
		validateRequiredParams(["firstName", "lastName", "email", "password"]),
		validateUser,
		createUser
	);

export default router;
