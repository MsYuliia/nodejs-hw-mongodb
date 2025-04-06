import bcrypt from 'bcrypt';
import User from '../db/models/user.js';

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
