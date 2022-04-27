const Contact = require("../models/contact");

const listContacts = async (_id) => {
  return await Contact.find({ owner: _id }).populate(
    "owner",
    "_id email subscription"
  );
};

const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

const addContact = async (_id, body) => {
  return await Contact.create({ ...body, owner: _id });
};

const removeContact = async (contactId) => {
  return await Contact.findByIdAndRemove(contactId);
};

const updateContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate(contactId, { ...body }, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
