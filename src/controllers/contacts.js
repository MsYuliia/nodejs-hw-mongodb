import createError from 'http-errors';
import {
  getContactsService,
  getContactByIdService,
  createContactService,
  updateContactService,
  deleteContactService,
} from '../services/contacts.js';

async function getContacts(_, res) {
    const contacts = await getContactsService();

    if (!contacts) {
      throw createError(404, 'Contacts not found');
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
 
}

async function getContactById(req, res) {

    const { id } = req.params;
    const contact = await getContactByIdService(id);

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
  const newContact = await createContactService(req.body);


  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

const updateContact = async (req, res) => {
 
    const { id } = req.params;
    const updatedContact = await updateContactService(id, req.body);

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
    const deletedContact = await deleteContactService(id);

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
