import Contact from '../db/models/contacts.js'; // Updated path to the Contact model

export async function getContactsService() {
  try {
    const contacts = await Contact.find({});
    return contacts;
  } catch (error) {
    throw new Error('Error fetching contacts: ' + error.message);
  }
}

export async function getContactByIdService(contactId) {
  try {
    const contact = await Contact.findById(contactId);
    return contact;
  } catch (error) {
    throw new Error('Error fetching contact by ID: ' + error.message);
  }
}
