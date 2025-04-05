import Contact from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/paginationHelpers.js';

export async function getContactsService({ page, perPage, sortBy, sortOrder }) {
  try {
    const limit = perPage;
    const skip = (page - 1) * perPage;
    const sortOption = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    const contactsQuery = Contact.find();
    const contactsCount = await Contact.find().countDocuments();

    const contacts = await contactsQuery
      .skip(skip)
      .limit(limit)
      .sort(sortOption)
      .exec();

    const paginationData = calculatePaginationData(
      contactsCount,
      perPage,
      page,
    );

    return {
      data: contacts,
      ...paginationData,
    };
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
