import { randomBytes } from 'crypto';
import bcrypt from 'bcrypt';
import User from '../db/models/user.js';
import createError from 'http-errors';
import Session from '../db/models/session.js';
import { ONE_DAY, FIFTEEN_MINUTES } from '../utils/constance.js';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/sendMail.js';

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
    throw createError(401, 'User not found');
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

export async function sendResetEmailService(email) {
  const user = await User.findOne({ email });

  if (!user) {
    throw createError(404, 'User not found!');
  }
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign({ email }, secret, {
    expiresIn: '5m',
  });
  const resetLink = `${process.env.APP_DOMAIN}/reset-pwd?token=${token}`;

  const mailOptions = {
    to: email,
    subject: 'Reset Your Password',
    text: `Click the link to reset your password: ${resetLink}`,
    html: `<p>Click the link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
  };

  try {
    await sendEmail(mailOptions);
  } catch (error) {
    console.log(error);

    throw createError(500, 'Failed to send the email, please try again later.');
  }
}

export async function resetPasswordService(token, password) {
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw createError(401, 'Token is expired or invalid.');
  }

  const user = await User.findOne({ email: decoded.email });
  if (!user) {
    throw createError(404, 'User not found!');
  }

  user.password = await bcrypt.hash(password, 10);
  await user.save();

  await Session.deleteMany({ userId: user._id });
}
