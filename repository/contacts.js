const { Contact } = require("../models/contact");

const listContacts = async (userId, skip, limit) => {
  return await Contact.find({ owner: userId }, "", {
    skip,
    limit,
  }).populate("owner", "_id email subscription");
};

const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

const addContact = async (userId, body) => {
  return await Contact.create({ ...body, owner: userId });
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
