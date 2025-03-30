import Contact from '../db/models/contacts.js';

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

export async function createContactService(contactData) {
  try {
    const newContact = new Contact(contactData);
    return await newContact.save();
  } catch (error) {
    throw new Error('Error creating contact: ' + error.message);
  }
}

export const updateContactService = async (contactId, updateData) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { $set: updateData },
    { new: true, runValidators: true },
  );

  return updatedContact;
};

export const deleteContactService = async (contactId) => {
  const deletedContact = await Contact.findByIdAndDelete(contactId);
  
  return deletedContact;
};
