import express, { Router } from "express";
import { createUser } from "../controllers/userController";
import { validateUser } from "../middlewares/userMiddleware";

const router = express.Router();

router.route("/").post(validateUser, createUser);

export default router;
