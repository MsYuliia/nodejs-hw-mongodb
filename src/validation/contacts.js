import Joi from 'joi';

const messages = {
  name: {
    empty: 'Name is required.',
    min: 'Name must be at least 3 characters long.',
    max: 'Name must not exceed 20 characters.',
    required: 'Name is required.',
  },
  phoneNumber: {
    empty: 'Phone number is required.',
    min: 'Phone number must be at least 3 characters long.',
    max: 'Phone number must not exceed 20 characters.',
    required: 'Phone number is required.',
  },
  email: {
    email: 'Email must be a valid email address.',
  },
  contactType: {
    only: 'Contact type must be one of work, home, or personal.',
    required: 'Contact type is required.',
  },
};

export const postContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.empty': messages.name.empty,
    'string.min': messages.name.min,
    'string.max': messages.name.max,
    'any.required': messages.name.required,
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.empty': messages.phoneNumber.empty,
    'string.min': messages.phoneNumber.min,
    'string.max': messages.phoneNumber.max,
    'any.required': messages.phoneNumber.required,
  }),
  email: Joi.string().email().optional().messages({
    'string.email': messages.email.email,
  }),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'any.only': messages.contactType.only,
      'any.required': messages.contactType.required,
    }),
});

export const patchContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).optional().messages({
    'string.min': messages.name.min,
    'string.max': messages.name.max,
  }),
  phoneNumber: Joi.string().min(3).max(20).optional().messages({
    'string.min': messages.phoneNumber.min,
    'string.max': messages.phoneNumber.max,
  }),
  email: Joi.string().email().optional().messages({
    'string.email': messages.email.email,
  }),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .optional()
    .messages({
      'any.only': messages.contactType.only,
    }),
});
