import express from 'express';
import {
  registerUser,
  loginUser,
  refreshSession,
  logoutUser,
  sendResetEmail,
  resetPassword,
} from '../controllers/auth.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';
import {
  registerUserSchema,
  loginUserSchema,
  sendResetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';

const router = express.Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUser),
);

router.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUser));

router.post('/refresh', ctrlWrapper(refreshSession));

router.post('/logout', ctrlWrapper(logoutUser));

router.post(
  '/send-reset-email',
  validateBody(sendResetEmailSchema),
  ctrlWrapper(sendResetEmail),
);

router.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPassword),
);

export default router;
