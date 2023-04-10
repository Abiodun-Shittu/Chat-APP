import express from 'express';
import { createUser } from '../Controllers/UserController';
import { validateUser } from '../Middlewares/UserMiddleware';
import { validateRequiredParams } from '../Middlewares/ValidatorMiddleware';

const router = express.Router();

router
  .route('/')
  .post(
    validateRequiredParams(['firstName', 'lastName', 'email', 'password']),
    validateUser,
    createUser
  );

export default router;
