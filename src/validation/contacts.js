import Joi from 'joi';

export const contactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.empty': 'Name is required.',
    'string.min': 'Name must be at least 3 characters long.',
    'string.max': 'Name must not exceed 20 characters.',
    'any.required': 'Name is required.',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.empty': 'Phone number is required.',
    'string.min': 'Phone number must be at least 3 characters long.',
    'string.max': 'Phone number must not exceed 20 characters.',
    'any.required': 'Phone number is required.',
  }),
  email: Joi.string().email().optional().messages({
    'string.email': 'Email must be a valid email address.',
  }),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'any.only': 'Contact type must be one of work, home, or personal.',
      'any.required': 'Contact type is required.',
    }),
});
