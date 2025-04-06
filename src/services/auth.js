import { randomBytes } from 'crypto';
import bcrypt from 'bcrypt';
import User from '../db/models/user.js';
import createError from 'http-errors';
import Session from '../db/models/session.js';
import { ONE_DAY, FIFTEEN_MINUTES } from '../utils/constance.js';

export async function registerUserService({ name, email, password }) {
  const existingEmail = await User.findOne({ email });

  if (existingEmail) {
    return null;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  const savedUser = await newUser.save();

  const { password: _, ...userWithoutPassword } = savedUser.toObject();

  return userWithoutPassword;
}

export async function loginUserService({ email, password }) {
  const user = await User.findOne({ email });

  if (!user) {
    throw createError(404, 'User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw createError(401, 'Unauthorized');
  }

  // Remove old session if exists
  await Session.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  const session = await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY * 30),
  });

  return {
    accessToken: session.accessToken,
    refreshToken: session.refreshToken,
    sessionId: session._id,
  };
}

export async function refreshSessionService(refreshToken) {
  const session = await Session.findOne({ refreshToken });

  if (!session || session.refreshTokenValidUntil < new Date()) {
    throw createError(401, 'Invalid or expired refresh token');
  }

  // Remove old session
  await Session.deleteOne({ _id: session._id });

  const accessToken = randomBytes(30).toString('base64');
  const newRefreshToken = randomBytes(30).toString('base64');

  const newSession = await Session.create({
    userId: session.userId,
    accessToken,
    refreshToken: newRefreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY * 30),
  });

  return {
    accessToken: newSession.accessToken,
    newRefreshToken: newSession.refreshToken,
    sessionId: newSession._id,
  };
}

export async function logoutUserService(sessionId, refreshToken) {
  const session = await Session.findOne({ _id: sessionId, refreshToken });

  if (!session) {
    throw createError(404, 'Session not found or invalid');
  }

  await Session.deleteOne({ _id: session._id });
}
