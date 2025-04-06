import {
  registerUserService,
  loginUserService,
  refreshSessionService,
  logoutUserService,
} from '../services/auth.js';
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

  const { accessToken, refreshToken, sessionId } = await loginUserService({
    email,
    password,
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 30 * ONE_DAY, // 30 days
  });

  res.cookie('sessionId', sessionId, {
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

export async function refreshSession(req, res) {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw createError(401, 'Refresh token is missing');
  }

  const { accessToken, newRefreshToken, sessionId } =
    await refreshSessionService(refreshToken);

  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 30 * ONE_DAY, // 30 days
  });

  res.cookie('sessionId', sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 30 * ONE_DAY, // 30 days
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken },
  });
}

export async function logoutUser(req, res) {
  const { sessionId, refreshToken } = req.cookies;

  if (!sessionId || !refreshToken) {
    throw createError(401, 'Session ID or Refresh Token is missing');
  }

  await logoutUserService(sessionId, refreshToken);

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });

  res.clearCookie('sessionId', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });

  res.status(204).send();
}
