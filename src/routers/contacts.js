import express from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';
import isValidId from '../middlewares/isValidId.js';
import { contactSchema } from '../validation/contacts.js';
import {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contacts.js';

const router = express.Router();

router.get('/', ctrlWrapper(getContacts));
router.get('/:id', isValidId, ctrlWrapper(getContactById));
router.post('/', validateBody(contactSchema), ctrlWrapper(createContact));
router.delete('/:id', isValidId, ctrlWrapper(deleteContact));
router.patch(
  '/:id',
  isValidId,
  validateBody(contactSchema),
  ctrlWrapper(updateContact),
);

export default router;
