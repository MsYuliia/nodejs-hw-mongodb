import { registerUserService, loginUserService } from '../services/auth.js';
import createError from 'http-errors';
import { ONE_DAY } from '../utils/constance.js';

export async function registerUser(req, res) {
  const { name, email, password } = req.body;

  const user = await registerUserService({ name, email, password });

  if (!user) {
    throw createError(409, 'Email in use');
  }

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
}

export async function loginUser(req, res) {
  const { email, password } = req.body;

  const { accessToken, refreshToken } = await loginUserService({
    email,
    password,
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 30 * ONE_DAY, // 30 days
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken },
  });
}
