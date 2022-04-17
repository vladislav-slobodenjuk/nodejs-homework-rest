const express = require("express");
const contactsModel = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const data = await contactsModel.listContacts();
  res.json({ status: "success", code: 200, data });
});

router.get("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const data = await contactsModel.getContactById(contactId);

  if (!data) {
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  }

  res.json({ status: "success", code: 200, data });
});

router.post("/", async (req, res, next) => {
  // validateBody(schemaCreateContact)
  console.log("body:", req.body);

  const newContact = await contactsModel.addContact(req.body);
  res.status(201).json({ status: "success", code: 201, data: newContact });
});

router.delete("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const data = await contactsModel.removeContact(contactId);

  if (!data) {
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  }

  res.json({ status: "success", code: 200, message: "contact deleted", data });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
