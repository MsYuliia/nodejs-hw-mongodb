import Contact from '../db/models/contacts.js';

export async function getContactsService() {
  try {
    const contacts = await Contact.find({});
    return contacts;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getContactByIdService(contactId) {
  try {
    const contact = await Contact.findById(contactId);
    return contact;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createContactService(contactData) {
  try {
    const newContact = new Contact(contactData);
    return await newContact.save();
  } catch (error) {
    console.error(error);
    return null;
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
