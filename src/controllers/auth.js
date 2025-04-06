import { registerUserService } from '../services/auth.js';
import createError from 'http-errors';

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
