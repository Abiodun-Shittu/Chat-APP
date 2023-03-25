import express, { Router } from "express";
import { createUser } from "../controllers/userController";

const router = express.Router()

router.route('/user').post(createUser);

export default router;