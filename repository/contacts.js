const Contact = require("../models/contact");

const listContacts = async () => {
  return await Contact.find();
};

const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact || null;
};

const addContact = async (body) => {
  return await Contact.create(body);
};

const removeContact = async (contactId) => {
  return (await Contact.findByIdAndRemove(contactId)) || null;
};

const updateContact = async (contactId, body) => {
  const contact = await Contact.findByIdAndUpdate(contactId, { ...body });
  return contact;
};

const updateStatusContact = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate(contactId, { ...body });
  return result || null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
