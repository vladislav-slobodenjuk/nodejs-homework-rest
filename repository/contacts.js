const { Contact } = require("../models/contact");

const listContacts = async (userId, skip, limit) => {
  return await Contact.find({ owner: userId }, "", {
    skip,
    limit,
  }).populate("owner", "_id email subscription");
};

const getContactById = async (contactId, userId) => {
  return await Contact.findOne({ _id: contactId, owner: userId });
};

const addContact = async (userId, body) => {
  return await Contact.create({ ...body, owner: userId });
};

const removeContact = async (contactId, userId) => {
  return await Contact.findOneAndRemove({ _id: contactId, owner: userId });
};

const updateContact = async (contactId, userId, body) => {
  return await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true }
  );
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
