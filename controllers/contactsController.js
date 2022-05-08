const Errors = require("http-errors");
const contactRepository = require("../repository/contacts");

const listContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const data = await contactRepository.listContacts(_id, skip, limit);
  res.json({ status: "success", code: 200, page, data });
};

const getContactById = async (req, res) => {
  const contactId = req.params.contactId;
  const { _id: userId } = req.user; // деструктуризация с переименованием
  const data = await contactRepository.getContactById(contactId, userId);
  if (!data) {
    throw new Errors.NotFound(`Contact ${contactId} not found`);
  }
  res.json({ status: "success", code: 200, data });
};

const addContact = async (req, res) => {
  const { _id } = req.user;
  const newContact = await contactRepository.addContact(_id, req.body);
  res.status(201).json({ status: "success", code: 201, data: newContact });
};

const removeContact = async (req, res) => {
  const contactId = req.params.contactId;
  const { _id: userId } = req.user; // деструктуризация с переименованием
  const data = await contactRepository.removeContact(contactId, userId);
  if (!data) {
    throw new Errors.NotFound(`Contact ${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data,
  });
};

const updateContact = async (req, res) => {
  const contactId = req.params.contactId;
  const { _id: userId } = req.user; // деструктуризация с переименованием
  const data = await contactRepository.updateContact(
    contactId,
    userId,
    req.body
  );
  if (!data) {
    throw new Errors.NotFound(`Contact ${contactId} not found`);
  }
  res.status(200).json({ status: "success", code: 200, data });
};

const updateStatusContact = async (req, res) => {
  const contactId = req.params.contactId;
  const { _id: userId } = req.user; // деструктуризация с переименованием

  if (Object.getOwnPropertyNames(req.body).length === 0) {
    throw new Errors.BadRequest("missing field favorite");
  }
  const data = await contactRepository.updateContact(
    contactId,
    userId,
    req.body
  );
  if (!data) {
    throw new Errors.NotFound(`Contact ${contactId} not found`);
  }
  res.status(200).json({ status: "success", code: 200, data });
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
