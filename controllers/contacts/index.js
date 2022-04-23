const Errors = require("http-errors");

const contactsModel = require("../../models/contacts");

const listContacts = async (req, res, next) => {
  try {
    const data = await contactsModel.listContacts();
    res.json({ status: "success", code: 200, data });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  const contactId = req.params.contactId;

  try {
    const data = await contactsModel.getContactById(contactId);
    if (!data) {
      throw new Errors.NotFound(`Contact ${contactId} not found`);
    }
    res.json({ status: "success", code: 200, data });
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  console.log("body:", req.body);

  try {
    const newContact = await contactsModel.addContact(req.body);
    res.status(201).json({ status: "success", code: 201, data: newContact });
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  const contactId = req.params.contactId;

  try {
    const data = await contactsModel.removeContact(contactId);
    if (!data) {
      throw new Errors.NotFound(`Contact ${contactId} not found`);
    }

    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  const contactId = req.params.contactId;

  try {
    const data = await contactsModel.updateContact(contactId, req.body);
    if (!data) {
      throw new Errors.NotFound(`Contact ${contactId} not found`);
    }
    res.status(200).json({ status: "success", code: 200, data });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
