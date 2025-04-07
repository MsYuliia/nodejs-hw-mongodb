import createError from 'http-errors';
import {
  getContactsService,
  getContactByIdService,
  createContactService,
  updateContactService,
  deleteContactService,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/paginationHelpers.js';
import { parseSortParams } from '../utils/sortingHelper.js';
import { parseFilterParams } from '../utils/filteringHelper.js';
import { saveFileToCloudinary } from '../utils/cloudinaryHelper.js';

async function getContacts(req, res) {
  const paginationParams = parsePaginationParams(req.query);
  const sortParams = parseSortParams(req.query);
  const filterParams = parseFilterParams(req.query);

  const data = await getContactsService({
    ...paginationParams,
    ...sortParams,
    filterParams,
    userId: req.user._id,
  });

  if (!data) {
    throw createError(404, 'Contacts not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
}

async function getContactById(req, res) {
  const { id } = req.params;
  const contact = await getContactByIdService(id, req.user._id);

  if (!contact) {
    throw createError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data: contact,
  });
}

const createContact = async (req, res) => {
  const photo = req.file;

  let photoUrl;

  photoUrl = await saveFileToCloudinary(photo);

  const newContact = await createContactService({
    ...req.body,
    photo: photoUrl,
    userId: req.user._id,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

const updateContact = async (req, res) => {
  const photo = req.file;

  let photoUrl;

  photoUrl = await saveFileToCloudinary(photo);

  const { id } = req.params;
  const updatedContact = await updateContactService(
    id,
    { ...req.body, ...(photoUrl && { photo: photoUrl }) },
    req.user._id,
  );

  if (!updatedContact) {
    throw createError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const deletedContact = await deleteContactService(id, req.user._id);

  if (!deletedContact) {
    throw createError(404, 'Contact not found');
  }

  res.status(204).send();
};

export {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
