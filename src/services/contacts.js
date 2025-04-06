import Contact from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/paginationHelpers.js';

export async function getContactsService({
  page,
  perPage,
  sortBy,
  sortOrder,
  filterParams,
  userId,
}) {
  try {
    const limit = perPage;
    const skip = (page - 1) * perPage;
    const sortOption = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    const contactsQuery = Contact.find({ ...filterParams, userId }).sort(
      sortOption,
    );
    const contactsCount = await Contact.find({
      ...filterParams,
      userId,
    }).countDocuments();

    const contacts = await contactsQuery.skip(skip).limit(limit).exec();

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

export async function getContactByIdService(contactId, userId) {
  try {
    const contact = await Contact.findOne({ _id: contactId, userId });
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

export const updateContactService = async (contactId, updateData, userId) => {
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    { $set: updateData },
    { new: true, runValidators: true },
  );

  return updatedContact;
};

export const deleteContactService = async (contactId, userId) => {
  const deletedContact = await Contact.findOneAndDelete({
    _id: contactId,
    userId,
  });

  return deletedContact;
};
