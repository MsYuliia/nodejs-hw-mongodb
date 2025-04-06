import express from 'express';
import {
  registerUser,
  loginUser,
  refreshSession,
  logoutUser,
} from '../controllers/auth.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';
import { registerUserSchema, loginUserSchema } from '../validation/auth.js';

const router = express.Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUser),
);

router.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUser));

router.post('/refresh', ctrlWrapper(refreshSession));

router.post('/logout', ctrlWrapper(logoutUser));

export default router;
