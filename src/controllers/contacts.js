import {
  getContactsService,
  getContactByIdService,
} from '../services/contacts.js';

export async function getContacts(req, res) {
  try {
    const contacts = await getContactsService();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Failed to retrieve contacts.',
      error: error.message,
    });
  }
}

export async function getContactById(req, res) {
  try {
    const { contactId } = req.params;
    const contact = await getContactByIdService(contactId);

    if (!contact) {
      return res.status(404).json({
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch {
    return res.status(404).json({
      message: 'Contact not found',
    });
  }
}
