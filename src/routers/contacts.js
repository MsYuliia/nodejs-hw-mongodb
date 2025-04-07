import express from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';
import isValidId from '../middlewares/isValidId.js';
import authenticate from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import {
  patchContactSchema,
  postContactSchema,
} from '../validation/contacts.js';
import {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contacts.js';

const router = express.Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getContacts));
router.get('/:id', isValidId, ctrlWrapper(getContactById));
router.post(
  '/',
  upload.single('photo'),
  validateBody(postContactSchema),
  ctrlWrapper(createContact),
);
router.delete('/:id', isValidId, ctrlWrapper(deleteContact));
router.patch(
  '/:id',
  isValidId,
  upload.single('photo'),
  validateBody(patchContactSchema),
  ctrlWrapper(updateContact),
);

export default router;
