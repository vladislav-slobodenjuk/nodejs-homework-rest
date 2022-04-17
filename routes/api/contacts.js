const express = require("express");
const Errors = require("http-errors");
const contactsModel = require("../../models/contacts");
const validateBody = require("../../middlewares/validation");
const schemaCreateContact = require("./contactsValidationSchems");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await contactsModel.listContacts();
    res.json({ status: "success", code: 200, data });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
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
});

router.post("/", validateBody(schemaCreateContact), async (req, res, next) => {
  console.log("body:", req.body);

  try {
    const newContact = await contactsModel.addContact(req.body);
    res.status(201).json({ status: "success", code: 201, data: newContact });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
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
});

router.put(
  "/:contactId",
  validateBody(schemaCreateContact),
  async (req, res, next) => {
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
  }
);

module.exports = router;
