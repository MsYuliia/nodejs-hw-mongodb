import Joi from 'joi';

const messages = {
  name: {
    empty: 'Name is required.',
    min: 'Name must be at least 3 characters long.',
    max: 'Name must not exceed 30 characters.',
    required: 'Name is required.',
  },
  email: {
    email: 'Email must be a valid email address.',
    required: 'Email is required.',
  },
  password: {
    empty: 'Password is required.',
    min: 'Password must be at least 6 characters long.',
    required: 'Password is required.',
  },
};

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.empty': messages.name.empty,
    'string.min': messages.name.min,
    'string.max': messages.name.max,
    'any.required': messages.name.required,
  }),
  email: Joi.string().email().required().messages({
    'string.email': messages.email.email,
    'any.required': messages.email.required,
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': messages.password.empty,
    'string.min': messages.password.min,
    'any.required': messages.password.required,
  }),
});
