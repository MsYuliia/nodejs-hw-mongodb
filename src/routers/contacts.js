import express from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contacts.js';

const router = express.Router();

router.get('/', ctrlWrapper(getContacts));
router.get('/:id', ctrlWrapper(getContactById));
router.post('/', ctrlWrapper(createContact));
router.put('/:id', ctrlWrapper(updateContact));
router.delete('/:id', ctrlWrapper(deleteContact));
router.patch('/:id', ctrlWrapper(updateContact));

export default router;
